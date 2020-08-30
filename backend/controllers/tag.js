const slugify = require("slug");
const { Tag } = require("../models/tag");

exports.list = async (req, res) => {
  try {
    let tags = await Tag.find({});
    if (tags) res.status(200).json(tags);
  } catch (error) {
    return res.status(400).json({
      error: "Categories could not load...",
    });
  }
};

exports.create = async (req, res) => {
  console.log("Create Tag!");
  const { title } = req.body;

  let slug = slugify(title).toLowerCase();
  let tag = new Tag({ title, slug });

  try {
    let newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      error: "Tag Created Error",
    });
  }
};

exports.update = async (req, res) => {
  console.log("Update Tag!");
  const { title } = req.body;
  const { slug } = req.params;
  let newslug = slugify(title).toLowerCase();

  try {
    let updatedTag = await Tag.findOneAndUpdate(
      { slug },
      { title, slug: newslug },
      { new: true }
    );
    return res.status(200).json(updatedTag);
  } catch (error) {
    return res.status(400).json({ error: "Resource Updated Failed!" });
  }
};

exports.remove = async (req, res) => {
  console.log("Delete Tag!");
  const { slug } = req.params;
  console.log("slug", slug);

  try {
    let deletedTag = await Tag.findOneAndRemove({ slug });
    console.log("deleteTag", deletedTag);
    return res.status(200).json(deletedTag);
  } catch (error) {
    return res.status(204).send({ message: "Resource Deleted Failed!" });
  }
};
