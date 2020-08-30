/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createWork } from "../../actions/work";
import { getCookie } from "../../helpers/auth";
import { getCategories } from "../../actions/category";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-images-upload";
import QuillEditor from "../../helpers/QuillEditor";
import {
  Spliter,
  Container,
  Form,
  ImageWrapper,
  TitleWrapper,
  Title,
  ExcerptWrapper,
  ExcerptTextArea,
  ArtistWrapper,
  ArtistInput,
  TagWrapper,
  TagListWrapper,
  TagInputWrapper,
  TagList,
  TagInput,
  CategoryWrapper,
  CategoryUl,
  QuillWrapper,
  BtnWrapper,
  SubmitBtn,
  HomeBtn,
  ErrorAlert,
  SuccessAlert,
} from "../../styles/CreateWork";

const CreateWork = () => {
  const [imageData, setImageData] = useState({
    mime: "",
    name: "",
    image: "",
  });

  const [content, setContent] = useState({
    body: "",
    references: [],
  });
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [references, setReferences] = useState([]);

  const [checked, setChecked] = useState([]);
  const [values, setValues] = useState({
    error: "",
    formData: "",
    success: "",
    title: "",
    artist: "",
    excerpt: "",
  });

  const token = getCookie("token");

  const { error, success, title, artist, formData, excerpt } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
  }, []);

  const initCategories = async () => {
    let response = await getCategories();
    console.log("response", response);
    if (response) {
      if (response.error) setValues({ ...values, error: response.error });
      else setCategories(response);
    }
  };

  const onImage = (failedImages, successImages) => {
    console.log("successImage", successImages);
    setValues({ ...values, error: "", success: "" });
    if (successImages.length > 0) {
      const parts = successImages[0].split(";");
      setImageData({
        ...imageData,
        mime: parts[0].split(":")[1],
        name: parts[1].split("=")[1],
        image: parts[2],
      });
    } else {
      setImageData({
        ...imageData,
        mime: "",
        name: "",
        image: "",
      });
    }
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: "" });
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) all.push(c);
    else all.splice(clickedCategory, 1);

    setChecked(all);
    formData.set("categories", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i}>
          <input onChange={handleToggle(c._id)} type="checkbox" />
          <label>{c.slug}</label>
        </li>
      ))
    );
  };

  const handleChange = (name) => (e) => {
    formData.set(name, e.target.value);

    setValues({
      ...values,
      [name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const tagDuplication_checker = (value) => {
    return tags.find((tag) => tag === value);
  };

  // Tag가 하나도 없으면 에러
  const addTags = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", success: "" });
    if (e.key === "Enter" && e.target.value !== "") {
      let checker = tagDuplication_checker(e.target.value);
      if (!checker) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };

  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  const createTag = () => (
    <TagWrapper>
      <TagInputWrapper>
        <TagInput
          type="text"
          onKeyUp={(e) => addTags(e)}
          placeholder="Press enter to add tags"
        />
      </TagInputWrapper>
      <TagListWrapper>
        {tags.map((tag, index) => (
          <TagList onClick={() => removeTags(index)} key={index}>
            {tag}
          </TagList>
        ))}
      </TagListWrapper>
    </TagWrapper>
  );

  const onEditorChange = (value) => {
    setValues({ ...values, error: "", success: "" });
    setReferences([...references, value.reference]);
    setContent(value.editorHtml);

    console.log("reference", references);
  };

  const onFilesChange = (files) => {
    setValues({ ...values, error: "" });
    setFiles(files);
  };

  const publishWork = async (e) => {
    e.preventDefault();
    formData.set("tags", tags);
    formData.set("references", JSON.stringify(references));
    formData.set("body", content);
    formData.set("mime", imageData.mime);
    formData.set("name", imageData.name);
    formData.set("image", imageData.image);

    try {
      let response = await createWork(formData, token);
      if (response.error) {
        setValues({ ...values, error: response.error });
      } else {
        setValues({
          formData: "",
          title: "",
          artist: "",
          excerpt: "",
          success: "Successfully Created...",
        });
        setTags([]);
        setCategories([]);
        setReferences([]);
        setChecked([]);
        setContent({ body: "", references: [] });
        setFiles([]);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const createWorkForm = () => (
    <Container>
      <Form
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onSubmit={publishWork}
      >
        <ImageWrapper>
          <ImageUploader
            key="image-uploader"
            withIcon={true}
            singleImage={true}
            withPreview={true}
            label="Maximum size file: 15MB"
            buttonText="Choose an image"
            onChange={onImage}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
            maxFileSize={15485760}
            required
          />
        </ImageWrapper>
        {error && (
          <ErrorAlert>
            <h1>{error}</h1>
          </ErrorAlert>
        )}
        {success && (
          <SuccessAlert>
            <h1>{success}</h1>
          </SuccessAlert>
        )}
        <TitleWrapper>
          <Title
            type="text"
            value={title}
            onChange={handleChange("title")}
            placeholder="Title..."
            required
          />
        </TitleWrapper>
        <Spliter />
        <ExcerptWrapper>
          <ExcerptTextArea
            type="text"
            value={excerpt}
            onChange={handleChange("excerpt")}
            placeholder="Excerpt..."
            required
          />
        </ExcerptWrapper>
        <ArtistWrapper>
          <ArtistInput
            type="text"
            value={artist}
            onChange={handleChange("artist")}
            placeholder="Artist..."
            required
          />
        </ArtistWrapper>
        <Spliter />

        <React.Fragment>{createTag()}</React.Fragment>
        <CategoryWrapper>
          <CategoryUl>{showCategories()}</CategoryUl>
        </CategoryWrapper>
        <QuillWrapper>
          <QuillEditor
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
            style={{ width: "100%" }}
          />
        </QuillWrapper>
        <BtnWrapper>
          <HomeBtn>
            <Link to="/">Home</Link>
          </HomeBtn>
          <SubmitBtn type="submit">Submit</SubmitBtn>
        </BtnWrapper>
      </Form>
    </Container>
  );

  return <Container>{createWorkForm()}</Container>;
};

export default CreateWork;
