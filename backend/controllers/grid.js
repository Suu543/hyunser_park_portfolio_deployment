const dotenv = require("dotenv");
const fileType = require("file-type");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const AWS = require("aws-sdk");
dotenv.config();

const { Grid } = require("../models/grid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.createGridImage = (req, res) => {
  console.log("Create Grid Image");
  let grid = new Grid();
  let form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.multiples = true;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    const { image, mime, name } = fields;

    if (!image || !mime || !name)
      return res.json({ error: "Image is not provided..." });

    let imageData = image;
    if (image.substr(0, 7) === "base64,")
      imageData = image.substr(7, image.length);

    const buffer = Buffer.from(imageData, "base64");
    const fileInfo = await fileType.fromBuffer(buffer);
    const detectedExt = fileInfo.ext;
    const detectedMime = fileInfo.mime;

    if (detectedMime !== mime)
      return res.status(400).json({ message: "mime types don't match`" });

    const keyName = uuidv4();
    const key = `gridImages/${keyName}.${detectedExt}`;

    const params = {
      Bucket: "hyunser-park",
      Key: key,
      Body: buffer,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: mime,
    };

    s3.putObject(params, async (err, data) => {
      if (err) res.status(400).json({ error: "Upload to S3 Failed.." });
      const url = `https://hyunser-park.s3-${process.env.AWS_REGION}.amazonaws.com/${key}`;

      grid.image.url = url;
      grid.image.key = key;

      console.log("url", url);
      console.log("key", key);

      try {
        let newGridImage = await grid.save();
        return res.status(200).json(newGridImage);
      } catch (error) {
        console.log("Save Error!");
        return res.status(400).json({ error });
      }
    });
  });
};

exports.updateGridImage = async (req, res) => {
  console.log("Update Grid Image");
  const { id } = req.params;

  try {
    const currentImage = await Grid.findById({ _id: id });
    const deleteParams = {
      Bucket: "hyunser-park",
      Key: `${currentImage.image.key}`,
    };

    s3.deleteObject(deleteParams, (err, data) => {
      if (err) console.log("S3 DELETE ERROR DURING", err);
      else console.log("S3 DELETED DURING", data);
    });

    let form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.multiples = true;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      const { image, mime, name } = fields;

      let imageData = image;
      if (image.substr(0, 7) === "base64,")
        imageData = image.substr(7, image.length);

      const buffer = Buffer.from(imageData, "base64");
      const fileInfo = await fileType.fromBuffer(buffer);
      const detectedExt = fileInfo.ext;
      const detectedMime = fileInfo.mime;

      if (detectedMime !== mime)
        return res.status(400).json({ message: "mime types don't match`" });

      const keyName = uuidv4();
      const key = `gridImages/${keyName}.${detectedExt}`;

      const params = {
        Bucket: "hyunser-park",
        Key: key,
        Body: buffer,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: mime,
      };

      s3.putObject(params, async (err, data) => {
        if (err) res.status(400).json({ error: "Upload to S3 Failed.." });
        const url = `https://hyunser-park.s3-${process.env.AWS_REGION}.amazonaws.com/${key}`;

        currentImage.image.url = url;
        currentImage.image.key = key;

        console.log("url", url);
        console.log("key", key);

        try {
          let updateImage = await currentImage.save();
          return res.status(200).json(updateImage);
        } catch (error) {
          console.log("Save Error!");
          return res.status(400).json({ error });
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: "Could Not Delete Image",
    });
  }
};

exports.removeGridImage = async (req, res) => {
  const { id } = req.params;

  try {
    const removedData = await Grid.findByIdAndRemove({ _id: id });

    const deleteParams = {
      Bucket: "hyunser-park",
      Key: `${removedData.image.key}`,
    };

    s3.deleteObject(deleteParams, (err, data) => {
      if (err) console.log("S3 DELETE ERROR DURING", err);
      else console.log("S3 DELETED DURING", data);
    });

    return res.status(200).json({
      message: "Image Deleted Successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Could Not Delete Image",
    });
  }
};

exports.readGridImages = async (req, res) => {
  try {
    let images = await Grid.find({});
    if (images) res.status(200).json(images);
  } catch (error) {
    return res.status(400).json({
      error: "Images could not load...",
    });
  }
};
