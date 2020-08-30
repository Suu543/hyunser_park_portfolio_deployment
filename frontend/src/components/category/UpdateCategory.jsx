/* eslint-disable */
import React, { useState, useEffect } from "react";
import { getCookie } from "../../helpers/auth";
import useReactRouter from "use-react-router";
import { singleCategory, update } from "../../actions/category";
import Resizer from "react-image-file-resizer";
import styled from "styled-components";

const TestImage = styled.img`
  width: 300px;
  height: 300px;
`;

const UpdateCategory = () => {
  const { location } = useReactRouter();
  const splitedURL = location.pathname.split("/");
  const slug = splitedURL[splitedURL.length - 1];
  const [currentImage, setCurrentImage] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    initCategoryData();
  }, []);

  const token = getCookie("token");
  const { title, description, image } = state;

  const initCategoryData = async () => {
    try {
      const data = await singleCategory(slug);
      console.log("data", data.image);
      setState({
        title: data.title,
        description: data.description,
      });
      setCurrentImage(data.image.url);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }

    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        1000,
        1000,
        "PNG",
        100,
        0,
        (uri) => {
          setCurrentImage("");
          setState({ ...state, image: uri, success: "", error: "" });
        },
        "base64"
      );
    }
  };

  const handleSubmit = async (e) => {
    console.log("image", image);

    e.preventDefault();
    try {
      let data = { title, description, image };
      const response = await update(slug, data, token);

      console.log("response", response);
    } catch (error) {
      console.log("Category Create Error", error);
    }
  };

  return (
    <div>
      <h1>Heading</h1>

      <div>
        <TestImage
          src={currentImage}
          alt="Category Image has been modified..."
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange("title")}
          />
          <br />
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange("description")}
          />
          <br />
          <input
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/*"
            required
          />
          <button>submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
