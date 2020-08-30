/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { getCategories } from "../actions/category";
import { readGridImages } from "../actions/grid";
import { listReferencedByCategory, getRecentWorks } from "../actions/work";
import Layout from "./Layout";
import moment from "moment";
import {
  WorksContainer,
  WorkWrapper,
  WorkGroup,
  WorkThumb,
  WorkContent,
  TagWrapper,
} from "../styles/ReadWorks";

import {
  PortfolioContainer,
  PortfolioTitleWrapper,
  TitleWrapper,
  RecentWorksContainer,
  RecentWorkContainer,
  PortfolioWorkContainer,
  CategoryWrapper,
  CategoryCard,
  Thumb,
  WorkByCategoryContainer,
  LoadMoreButton,
} from "../styles/Portfolio";

import { ImageContainer } from "../styles/Home";

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import Fade from "react-reveal/Fade";

const Portfolio = () => {
  const [categories, setCategories] = useState([]);
  const [postsToShow, setPostsToShow] = useState([]);
  const [gridImages, setGridImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [recentWorks, setRecentWorks] = useState([]);
  const [works, setWorks] = useState([]);
  let postsPerPage = 16;
  let arrayForHoldingPosts = [];
  const ref = useRef(postsPerPage);

  const loopWithSlice = async (start, end) => {
    if (gridImages.length > 0) {
      const slicedPosts = gridImages.slice(start, end);
      arrayForHoldingPosts = arrayForHoldingPosts.concat(slicedPosts);
      setPostsToShow([...postsToShow, ...arrayForHoldingPosts]);
    } else {
      let test = [];
      let response = await readGridImages();
      response.forEach((img) => {
        let imgData = {
          width: 1,
          height: 1,
        };

        imgData.src = img.image.url;
        test.push(imgData);
      });
      const slicedPosts = test.slice(start, end);
      arrayForHoldingPosts = arrayForHoldingPosts.concat(slicedPosts);
      setPostsToShow([...postsToShow, ...arrayForHoldingPosts]);
    }
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const loadGridImages = async () => {
    try {
      let images = [];
      let response = await readGridImages();
      response.forEach((img) => {
        let imgData = {
          width: 1,
          height: 1,
        };

        imgData.src = img.image.url;
        images.push(imgData);
      });

      setGridImages([...images]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleShowMorePosts = () => {
    loopWithSlice(ref.current, ref.current + postsPerPage);
    ref.current += postsPerPage;
  };

  const loadCategories = async () => {
    try {
      let response = await getCategories();
      setCategories([...categories, ...response]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadWorksByReference = async () => {
    try {
      let result = [];
      let realResult = [];
      let response = await getCategories();
      let fetchedData = response.map(async (c, i) => {
        result.push(c.slug);
        return await listReferencedByCategory(c.slug);
      });

      console.log("result", result);

      Promise.all(fetchedData).then((results) => {
        result.map((r, i) => {
          let dummy = {};
          dummy["name"] = r;
          dummy["data"] = results[i];
          realResult.push(dummy);
        });
        console.log("realResult", realResult);
        setWorks([...realResult]);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadRecentWorks = async () => {
    try {
      let recentWorks = await getRecentWorks();
      console.log("recentWorks", recentWorks);
      setRecentWorks([...recentWorks]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadWorksByReference();
    loadGridImages();
    loadRecentWorks();
  }, []);

  useEffect(() => {
    loopWithSlice(0, postsPerPage);
  }, []);

  return (
    <Layout>
      <PortfolioContainer>
        <Fade left duration={1500}>
          <PortfolioTitleWrapper>
            <h1>Portfolio</h1>
            <hr />
          </PortfolioTitleWrapper>

          <ImageContainer>
            <Gallery
              style={{ gap: "2rem" }}
              photos={postsToShow}
              onClick={openLightbox}
            />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={postsToShow.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
            {postsToShow.length > 16 && (
              <LoadMoreButton onClick={handleShowMorePosts}>
                Load More
              </LoadMoreButton>
            )}
          </ImageContainer>
        </Fade>

        <TitleWrapper>
          <h1>Recent Works</h1>
          <hr />
        </TitleWrapper>

        <RecentWorksContainer>
          {recentWorks &&
            recentWorks.length > 0 &&
            recentWorks.map((recent, i) => (
              <RecentWorkContainer key={i}>
                <WorkWrapper>
                  <WorkGroup to={`/works/${recent.name}/${recent.slug}`}>
                    <WorkThumb url={recent.image.url}></WorkThumb>
                    <WorkContent>
                      <h1>{recent.title}</h1>
                      <span>{recent.excerpt}</span>
                    </WorkContent>
                  </WorkGroup>
                </WorkWrapper>
              </RecentWorkContainer>
            ))}
        </RecentWorksContainer>

        <TitleWrapper>
          <h1>Featured Categories</h1>
          <hr />
        </TitleWrapper>

        <PortfolioWorkContainer>
          {categories &&
            categories.length > 0 &&
            categories.map((c, i) => (
              <CategoryWrapper key={i}>
                <CategoryCard to={`/works/${c.slug}`}>
                  <Thumb url={c.image.url}></Thumb>
                  <article>
                    <h1>{c.title}</h1>
                  </article>
                </CategoryCard>
              </CategoryWrapper>
            ))}
        </PortfolioWorkContainer>

        <WorkByCategoryContainer>
          {works &&
            works.length > 0 &&
            works.map(
              (work, i) =>
                work.data.length > 0 &&
                work.data && (
                  <React.Fragment key={i}>
                    <h1>{work.name}</h1>
                    <hr />
                    <WorksContainer>
                      {work.data.map((w, i) => (
                        <WorkWrapper key={i}>
                          <WorkGroup to={`/works/${work.name}/${w.slug}`}>
                            <WorkThumb url={w.image.url}></WorkThumb>
                            <WorkContent>
                              <h2>{w.title}</h2>
                              <span>{w.excerpt}</span>
                              <TagWrapper>
                                {w.tags.map((t, i) => (
                                  <span key={i}>#{t.title}</span>
                                ))}
                              </TagWrapper>
                              <span>{moment(w.createAt).format("lll")}</span>
                            </WorkContent>
                          </WorkGroup>
                        </WorkWrapper>
                      ))}
                    </WorksContainer>
                  </React.Fragment>
                )
            )}
        </WorkByCategoryContainer>
      </PortfolioContainer>
    </Layout>
  );
};

export default Portfolio;
