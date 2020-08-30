import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import useReactRouter from "use-react-router";
import { getCookie } from "../../helpers/auth";
import { updateGridImage } from "../../actions/grid";

const ImageWrapper = styled.div`
  width: 80%;
  margin: auto;
`;

const UpdateGridImage = () => {
  const { location } = useReactRouter();
  const splitedURL = location.pathname.split("/");
  const id = splitedURL[splitedURL.length - 1];
  const [imageData, setImageData] = useState({
    mime: "",
    name: "",
    image: "",
  });

  const [values, setValues] = useState({
    formData: "",
  });

  const { formData } = values;

  const token = getCookie("token");

  useEffect(() => {
    setValues({ formData: new FormData() });
  }, []);

  const onImage = (failedImages, successImages) => {
    console.log("successImage", successImages);
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
      let response = await updateGridImage(id, formData, token);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const createImageForm = () => (
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
        <button type="submit">제출</button>
      </form>
    </ImageWrapper>
  );

  return <React.Fragment>{createImageForm()}</React.Fragment>;
};

export default UpdateGridImage;
