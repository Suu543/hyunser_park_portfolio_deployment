import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import { getCookie } from "../../helpers/auth";
import { Link } from "react-router-dom";
import { removeImage, readImages } from "../../actions/image";
import styled from "styled-components";

const ImageContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  margin-top: 10vh;
`;

const ImageTitleWrapper = styled.article`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 1%;
  align-items: flex-start;
  justify-content: flex-start;

  h1 {
    font-size: 5rem;
    color: #763735;
  }
`;

const ImageCreateFeature = styled.article`
  display: flex;
  width: 80%;
  margin: auto;

  button {
    padding: 1rem 2rem;
    margin-left: 1rem;
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: lighter;
    font-family: "Times New Roman", Times, serif;
    text-transform: capitalize;
    background: #31ae88;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    opacity: 0.9;

    :hover {
      outline: none;
      opacity: 1;
    }

    :active {
      outline: none;
      opacity: 1;
    }
  }
`;

const ImageCreateFeatureLink = styled(Link)`
  text-decoration: none;
`;

const ImageWrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  width: 80%;
  margin: auto;
`;

const ImageCard = styled.article`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  padding: 2rem;
  margin-top: 3rem;
  background: #9b8271;

  h1 {
    font-size: 2.5rem;
    color: #f3efdf;
  }
`;

const ImageFeatureWrapper = styled.article`
  justify-self: end;

  a {
    text-decoration: none;
  }

  button {
    padding: 1rem 2rem;
    margin-left: 1rem;
    font-size: 1.6rem;
    font-weight: lighter;
    font-family: "Times New Roman", Times, serif;
    text-transform: uppercase;
    background: #f57367;
    border: none;
    cursor: pointer;
  }
`;

const ReadImages = () => {
  const token = getCookie("token");
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      let response = await readImages();
      console.log("response", response);
      setImages([...response]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteImage = async (id) => {
    try {
      const deletedImage = await removeImage(id, token);
      if (deletedImage) alert(`Successfully Delete Image...`);
      await loadImages();
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteConfirm = (id) => {
    let answer = window.confirm("Do you really want to delete this category?");
    if (answer) deleteImage(id);
  };

  return (
    <Layout>
      <ImageContainer>
        <ImageTitleWrapper>
          <h1>Admin - Carousel</h1>
        </ImageTitleWrapper>
        <ImageCreateFeature>
          <ImageCreateFeatureLink to="/admin/carousel/create">
            <button>Create Carousel Image</button>
          </ImageCreateFeatureLink>
        </ImageCreateFeature>

        <ImageWrapper>
          {images &&
            images.map((img, i) => (
              <React.Fragment>
                <ImageCard>
                  <h1>{i + 1}번째 사진</h1>
                </ImageCard>
                <ImageFeatureWrapper>
                  <a
                    href={img.image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button style={{ background: "#f3c958" }}>Preview</button>
                  </a>
                  <Link to={`/admin/carousel/update/${img._id}`}>
                    <button style={{ background: "#09C0CB" }}>Update</button>
                  </Link>
                  <button onClick={() => deleteConfirm(img._id)}>Delete</button>
                </ImageFeatureWrapper>
              </React.Fragment>
            ))}
        </ImageWrapper>
      </ImageContainer>
    </Layout>
  );
};

export default ReadImages;
