import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import { getCookie } from "../../helpers/auth";
import { createGridImage } from "../../actions/grid";
import Layout from "../../core/Layout";

import { ErrorAlert, SuccessAlert } from "../../styles/CreateWork";

const CreateGridContainer = styled.section`
  width: 100%;
  background: white;
  margin-top: 10vh;
`;

const CreateGridTitle = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  margin-top: 4rem;
`;

const ImageWrapper = styled.article`
  width: 100%;
  margin: auto;
`;

const CreateGridSubmitBtn = styled.button`
  display: block;
  margin: auto;
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

const CreateGridImage = () => {
  const [imageData, setImageData] = useState({
    mime: "",
    name: "",
    image: "",
  });

  const [state, setState] = useState({
    error: "",
    success: "",
  });

  const [values, setValues] = useState({
    formData: "",
  });

  const { formData } = values;
  const { error, success } = state;

  const token = getCookie("token");

  useEffect(() => {
    setValues({ formData: new FormData() });
  }, []);

  const onImage = (failedImages, successImages) => {
    console.log("successImage", successImages);
    setState({ error: "", success: "" });
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

  const createImage = async (e) => {
    e.preventDefault();
    formData.set("mime", imageData.mime);
    formData.set("name", imageData.name);
    formData.set("image", imageData.image);

    try {
      let response = await createGridImage(formData, token);
      if (response.error) {
        setState({ ...state, error: response.error });
      } else {
        setState({
          ...state,
          success: "Successfully Created Grid Image...",
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const createImageForm = () => (
    <CreateGridContainer>
      <CreateGridTitle>Create Grid Image</CreateGridTitle>
      <ImageWrapper>
        <form onSubmit={createImage}>
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
          {error && <ErrorAlert>{error}</ErrorAlert>}
          {success && <SuccessAlert>{success}</SuccessAlert>}
          <CreateGridSubmitBtn type="submit">Create Image</CreateGridSubmitBtn>
        </form>
      </ImageWrapper>
    </CreateGridContainer>
  );

  return <Layout>{createImageForm()}</Layout>;
};

export default CreateGridImage;
