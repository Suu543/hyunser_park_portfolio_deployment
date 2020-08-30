import React, { useState } from "react";
import { getCookie } from "../../helpers/auth";
import { create } from "../../actions/category";
import Resizer from "react-image-file-resizer";
import Layout from "../../core/Layout";
import styled from "styled-components";
import { ErrorAlert, SuccessAlert } from "../../styles/CreateWork";

const CreateCategoryContainer = styled.section`
  width: 100%;
  background: white;
  margin-top: 10vh;
`;

const CategoryCreateTitle = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  margin-top: 4rem;
`;

const CategoryForm = styled.form`
  width: 100%;
  margin: auto;

  input {
    display: block;
    margin: auto;
    margin-top: 2rem;
    font-size: 1.5rem;
    text-align: center;
  }

  img {
    display: block;
    margin: 2rem auto;
    width: 180px;
    height: 180px;
  }
`;

const CategoryImageInput = styled.input``;

const CategoryTitleInput = styled.input`
  width: 30%;
  font-size: 1rem;
  padding: 1.3rem;
`;

const CreateCategorySubmitBtn = styled.button`
  display: block;
  margin: auto;
  margin-top: 2rem;
  font-size: 2rem;
  padding: 1rem;
  width: 200px;
  background: #12b886;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;

  :hover {
    opacity: 0.9;
  }

  :active {
    opacity: 1;
  }
`;

const CreateCategory = () => {
  const [state, setState] = useState({
    title: "",
    image: "",
    error: "",
    success: "",
  });

  const token = getCookie("token");
  const { title, image, error, success } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      success: "",
      error: "",
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
          // console.log(uri);
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
      let data = { title, image };
      const response = await create(data, token);
      if (response.error) setState({ ...state, error: response.error });
      else {
        setState({
          title: "",
          image: "",
          success: "Succssfully Created New Category",
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log("Category Create Error", error);
    }
  };

  return (
    <Layout>
      <CreateCategoryContainer>
        <CategoryCreateTitle>Create Category</CategoryCreateTitle>
        <CategoryForm onSubmit={handleSubmit}>
          <img
            alt="카테고리 생성"
            src="https://static.dribbble.com/users/1986212/screenshots/5156775/camera.gif"
          />
          <CategoryImageInput
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/*"
            required
          />
          <CategoryTitleInput
            type="text"
            name="title"
            onChange={handleChange("title")}
            placeholder="Category Title"
          />
          {error && <ErrorAlert style={{ width: "50%" }}>{error}</ErrorAlert>}
          {success && (
            <SuccessAlert style={{ width: "50%" }}>{success}</SuccessAlert>
          )}
          <CreateCategorySubmitBtn type="submit">
            Create Category
          </CreateCategorySubmitBtn>
        </CategoryForm>
      </CreateCategoryContainer>
    </Layout>
  );
};

export default CreateCategory;
