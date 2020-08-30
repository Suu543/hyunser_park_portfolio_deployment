const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const fileType = require("file-type");
const { v4: uuidv4 } = require("uuid");
const formidable = require("formidable");
const slugify = require("slug");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
dotenv.config();

const { smartTrim } = require("../helpers/smartTrim");
const { Work } = require("../models/work");
const { Tag } = require("../models/tag");
const { Category } = require("../models/category");
const { Reference } = require("../models/reference");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.list = async (req, res) => {
  try {
    const allWorks = await Work.find({});
    return res.status(200).json(allWorks);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.create = async (req, res) => {
  console.log("Create Work");

  const saveMultiTags = async (tags) => {
    const jobQuerys = [];
    const arrTagId = [];
    const splitedTags = tags.split(",");
    const allTags = await Tag.find({});

    allTags.forEach((data) => {
      if (splitedTags.find((tag) => data.title == tag)) {
        arrTagId.push(data._id);
        let index = splitedTags.indexOf(data.title);
        splitedTags.splice(index, 1);
      }
    });

    // console.log("spl", splitedTags);

    splitedTags.forEach((title) => {
      const newTag = new Tag({ title });
      jobQuerys.push(newTag.save());
    });

    const tagsResult = await Promise.all(jobQuerys);

    tagsResult.forEach((tag) => {
      arrTagId.push(tag._id);
    });

    return arrTagId;
  };

  const saveMultipleReferences = (references) => {
    const results = [];

    references.forEach((ref) => {
      if (ref.url.length > 0 && ref.key.length > 0) {
        results.push(ref);
      }
    });

    return results;
  };

  try {
    let work = new Work();
    let form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.multiples = true;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      // console.log("fields", fields);

      if (err) return res.status(400).json({ error: err });

      const {
        title,
        excerpt,
        artist,
        body,
        categories,
        tags,
        mime,
        image,
        references,
      } = fields;

      console.log("references", JSON.parse(references));

      console.log("title", title);
      if (!title || title.length < 2)
        return res.json({
          error: "Please Enter At Least One Characters...",
        });

      console.log("excerpt", excerpt);
      if (!excerpt || excerpt < 10)
        return res.json({
          error: "Please Enter At Least Ten Characters...",
        });

      console.log("artist", artist);
      if (!artist || artist.length < 1)
        return res.json({
          error: "Please Enter At Least One Artist Name...",
        });

      console.log("bod", body);
      if (!body || body.length < 1) {
        console.log("body error");
        return res.json({
          error: "Please Enter At Least One Character...",
        });
      }

      console.log("categories", categories);
      if (!categories || categories.length === 0)
        return res.json({
          error: "Please Pick At Least One Category...",
        });

      console.log("tags", tags);
      if (!tags || tags.length === 0)
        return res.json({
          error: "Please Pick At Least One Tag...",
        });

      console.log("image", !image);
      if (!image || image.length < 1)
        return res.json({
          error: "Please Select Main Image For this Work...",
        });

      console.log("hello");
      let imageData = image;
      if (image.substr(0, 7) === "base64,")
        imageData = image.substr(7, image.length);

      const buffer = Buffer.from(imageData, "base64");
      const fileInfo = await fileType.fromBuffer(buffer);
      const detectedExt = fileInfo.ext;
      const detectedMime = fileInfo.mime;

      if (detectedMime !== mime)
        return res.json({
          message: "mime types don't match`",
        });

      const keyName = uuidv4();
      const key = `works/${keyName}.${detectedExt}`;

      const params = {
        Bucket: "hyunser-park",
        Key: key,
        Body: buffer,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: mime,
      };

      let uniqueRefs = function (arr) {
        const filteredArr = arr.reduce((acc, current) => {
          const x = acc.find((item) => item.url == current.url);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        console.log("filteredArr", filteredArr);
        return filteredArr;
      };

      const updatedTags = await saveMultiTags(tags);
      const updatedRefs = saveMultipleReferences(
        uniqueRefs(JSON.parse(references))
      );

      console.log("updatedTags", updatedTags);
      console.log("updatedRefs", updatedRefs);

      s3.putObject(params, async (err, data) => {
        if (err) res.status(400).json({ error: "Upload to S3 Failed.." });

        const url = `https://hyunser-park.s3-${process.env.AWS_REGION}.amazonaws.com/${key}`;

        work.image.url = url;
        work.image.key = key;

        console.log("url", url);
        console.log("key", key);
        work.title = title;
        work.slug = slugify(title).toLowerCase();
        work.body = body;
        work.excerpt = smartTrim(excerpt, 60, " ", "...");
        work.artist = artist;
        work.categories = categories && categories.split(",");
        work.references = updatedRefs;
        work.tags = tags && updatedTags;

        try {
          let newWork = await work.save();
          return res.status(200).json(newWork);
        } catch (error) {
          console.log("Save Error!");
          return res.status(400).json({ error });
        }
      });
    });
  } catch (error) {
    console.log("error", error);

    return res.status(400).json({
      message: error.message || "Failed to upload image",
    });
  }
};

exports.read = async (req, res) => {
  const slug = req.params.slug;

  try {
    let work = await Work.findOne({ slug });
    return res.status(200).json(work);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.remove = async (req, res) => {
  const slug = req.params.slug;

  const deleteImage = async (key) => {
    const deletedParams = {
      Bucket: "hyunser-park",
      Key: `${key}`,
    };

    s3.deleteObject(deletedParams, (err, data) => {
      if (err) console.log("S3 DELETE ERROR DURING", err);
      else console.log("S3 DELETED DURING", data);
    });
  };

  try {
    let removedWork = await Work.findOneAndRemove({ slug });
    let removedReferences = removedWork["references"];
    let removedImage = removedWork["image"]["key"];

    await deleteImage(removedImage);

    removedReferences.map(async (ref) => {
      let deletedReference = await Reference.findByIdAndDelete({ _id: ref });

      if (deletedReference) {
        const deletedParams = {
          Bucket: "hyunser-park",
          Key: `${deletedReference["key"]}`,
        };

        s3.deleteObject(deletedParams, (err, data) => {
          if (err) console.log("S3 DELETE ERROR DURING", err);
          else console.log("S3 DELETED DURING", data);
        });
      }
    });

    return res.status(200).json(removedWork);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.uploadS3 = multer({
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "hyunser-park",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const keyName = uuidv4();
      const extension = path.extname(file.originalname);
      cb(null, `works/images/${keyName}${extension}`);
    },
  }),
});

exports.upload = async (req, res) => {
  const ref = new Reference();
  console.log("req.file.key", req.file);
  ref.url = req.file.location;
  ref.key = req.file.key;
  const result = await ref.save();
  return res.json({
    location: req.file.location,
    key: req.file.key,
    id: result._id,
  });
};

exports.listByReferencedCategory = async (req, res) => {
  const slug = req.params.category.toLowerCase();

  try {
    const referencedCategory = await Category.findOne({ slug });
    const works = await Work.find({ categories: { $in: referencedCategory } })
      .populate("categories", "title")
      .populate("tags", "title");
    // console.log("works", works);
    return res.status(200).json(works);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.findBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const work = await Work.findOne({ slug })
      .populate("categories", "title")
      .populate("tags", "title");
    return res.status(200).json(work);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.update = async (req, res) => {
  console.log("Update Work");
};

exports.getNineRecentWorks = async (req, res) => {
  try {
    const works = await Work.find({}).sort({ _id: -1 }).limit(9);
    console.log("test", works);
    return res.status(200).json(works);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
