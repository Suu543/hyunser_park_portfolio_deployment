const slugify = require("slug");
const dotenv = require("dotenv");
const fileType = require("file-type");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const { Category } = require("../models/category");
const { Work } = require("../models/work");
const { Reference } = require("../models/reference");

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.list = async (req, res) => {
  try {
    let categories = await Category.find({});
    if (categories) res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({
      error: "Categories could not load...",
    });
  }
};

exports.create = (req, res) => {
  console.log("Create Category!");
  const { title, image } = req.body;

  if (!title || title.length < 1)
    return res.json({ error: "title is not defined..." });

  if (!image || image.length < 1)
    return res.json({ error: "image is not defined..." });

  const base64Data = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const type = image.split(";")[0].split("/")[1];
  const params = {
    Bucket: "hyunser-park",
    Key: `image/${uuidv4()}.${type}`,
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  s3.upload(params, async (err, data) => {
    let newCategory = new Category({
      title: title.trim(),
      slug: slugify(title).toLowerCase().trim(),
    });
    if (err) res.status(400).json({ error: "Upload to S3 Failed..." });
    console.log("AWS UPOLOAD RES DATA", data);

    newCategory.image.url = data.Location;
    newCategory.image.key = data.key;

    try {
      let data = await newCategory.save();
      res.status(200).json(data);
    } catch (error) {
      console.log("Save Error");
      return res.status(400).json({
        error: "Error saving category to Database (Duplicated Category)",
      });
    }
  });
};

exports.singleCategory = async (req, res) => {
  console.log("req.params", req.params);

  const { slug } = req.params;

  try {
    const singleCategory = await Category.findOne({ slug });
    console.log("singleCategory", singleCategory);

    return res.status(200).json(singleCategory);
  } catch (error) {
    return res.status(400).json({
      error: "Could Not Read This Category",
    });
  }
};

exports.update = async (req, res) => {
  console.log("req.params", req.params);

  const { slug } = req.params;
  const body = req.body;

  try {
    const updated = await Category.findOneAndUpdate(
      { slug },
      { title: body.title },
      { new: true }
    );

    if (body.image) {
      const base64Data = new Buffer.from(
        body.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      const deletedParams = {
        Bucket: "hyunser-park",
        Key: `${updated.image.key}`,
      };

      s3.deleteObject(deletedParams, (err, data) => {
        if (err) console.log("S3 DELETE ERROR DURING UPDATE", err);
        else console.log("S3 DELETE DURING UPDATE", data);
      });

      const type = body.image.split(";")[0].split("/")[1];
      const params = {
        Bucket: "hyunser-park",
        Key: `image/${uuidv4()}.${type}`,
        Body: base64Data,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      };

      s3.upload(params, async (err, data) => {
        if (err) res.status(400).json({ error: "Upload to S3 Failed..." });
        console.log("AWS UPOLOAD RES DATA", data);

        updated.image.url = data.Location;
        updated.image.key = data.key;

        try {
          let data = await updated.save();
          return res.status(200).json(data);
        } catch (error) {
          console.log("Save Error");
          return res.status(400).json({
            error: "Error saving category to Database (Duplicated Category)",
          });
        }
      });
    }
  } catch (error) {
    console.log("error", error);

    return res.status(400).json({
      message: error.message || "failed to upload image",
    });
  }
};

const removeRelatedWorks = async (slug) => {
  const deleteImage = async (key) => {
    const deletedParams = {
      Bucket: "hyunser-park",
      Key: `${key}`,
    };

    s3.deleteObject(deletedParams, (err, data) => {
      console.log("3");
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
          console.log("2");
          if (err) console.log("S3 DELETE ERROR DURING", err);
          else console.log("S3 DELETED DURING", data);
        });
      }
    });
  } catch (error) {}
};

exports.remove = async (req, res) => {
  const { slug } = req.params;

  try {
    const removedData = await Category.findOneAndRemove({ slug });

    const relatedWorks = await Work.find({ categories: removedData._id });
    relatedWorks.map(async (work) => {
      await removeRelatedWorks(work.slug);
    });

    const deletedParams = {
      Bucket: "hyunser-park",
      Key: `${removedData.image.key}`,
    };

    s3.deleteObject(deletedParams, (err, data) => {
      console.log("1");
      if (err) console.log("S3 DELETE ERROR DURING", err);
      else console.log("S3 DELETED DURING", data);
    });

    return res.status(200).json({
      message: "Category Deleted Successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Could Not Delete Category",
    });
  }
};

// exports.update = async (req, res) => {
//   console.log("req.paramns", req.params);

//   const { slug } = req.params;
//   const body = req.body;
//   console.log("1");

//   try {
//     const updated = await Category.findOneAndUpdate(
//       { slug },
//       { title: body.title, description: body.description },
//       { new: true }
//     );

//     if (body.image) {
//       let imageData = "";
//       const deleteParams = {
//         Bucket: "hyunser-park",
//         Key: `categories/${updated.image.key}`,
//       };

//       s3.deleteObject(deleteParams, (err, data) => {
//         if (err) console.log("S3 DELETE ERROR DURING UPDATE", err);
//         else console.log("S3 DELETE DURING UPDATE", data);
//       });

//       if (body.image.substr(0, 7) === "base64,") {
//         imageData = body.image.substr(7, body.image.length);
//       }

//       const buffer = Buffer.from(imageData, "base64");
//       const fileInfo = await fileType.fromBuffer(buffer);
//       const detectedExt = fileInfo.ext;
//       const detectedMime = fileInfo.mime;

//       if (detectedMime !== body.mime) {
//         return res.status(400).json({ message: "mime types dont match" });
//       }

//       const keyName = uuidv4();
//       const key = `categories/${keyName}.${detectedExt}`;

//       const slug = slugify(body.title).toLowerCase();

//       updated.slug = slug;

//       const params = {
//         Bucket: "hyunser-park",
//         Key: key,
//         Body: buffer,
//         ACL: "public-read",
//         ContentEncoding: "base64",
//         ContentType: body.mime,
//       };

//       s3.putObject(params, async (err, data) => {
//         if (err) res.status(400).json({ error: "Upload to S3 Failed..." });
//         const url = `https://hyunserportfolio.s3-${process.env.AWS_REGION}.amazonaws.com/${key}`;
//         updated.image.url = url;
//         updated.image.key = key;

//         try {
//           let updatedCategory = await updated.save();
//           res.status(200).json(updatedCategory);
//         } catch (error) {
//           return res.status(400).json({
//             error: "Error saving category to Database (Duplicated Category)",
//           });
//         }
//       });
//     }
//   } catch (error) {
//     console.log("error", error);

//     return res.status(400).json({
//       message: error.message || "failed to upload image",
//     });
//   }
// };
