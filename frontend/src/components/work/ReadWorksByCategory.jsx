/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { listReferencedByCategory } from "../../actions/work";
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Layout from "../../core/Layout";
import moment from "moment";

import {
  ReadWorksContainer,
  ImageWrapper,
  WorksContainer,
  WorkWrapper,
  WorkGroup,
  WorkThumb,
  WorkContent,
  CategoryTitleWrapper,
  TagWrapper,
} from "../../styles/ReadWorks";

const ReadWorksByCategory = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const [works, setWorks] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    loadDataReferencedByCategory();
  }, []);

  const loadDataReferencedByCategory = async () => {
    try {
      let response = await listReferencedByCategory(category);
      console.log("response", response);
      setWorks([...response]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Layout>
      <ReadWorksContainer>
        <br />
        <ImageWrapper>
          <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={2000}
            animation="cubeAnimation"
          >
            {works.map((work, index) => (
              <div key={index} data-src={work.image.url}></div>
            ))}
          </AutoplaySlider>
        </ImageWrapper>
        <CategoryTitleWrapper>
          <h1>{category}</h1>
        </CategoryTitleWrapper>
        <WorksContainer>
          {works.map((work, index) => (
            <WorkWrapper key={index}>
              <WorkGroup to={`/works/${category}/${work.slug}`}>
                <WorkThumb url={work.image.url}></WorkThumb>
                <WorkContent>
                  <h1>{work.title}</h1>
                  <span>{work.excerpt}</span>
                  <TagWrapper>
                    {work.tags.map((t, i) => (
                      <span key={i}>#{t.title}</span>
                    ))}
                  </TagWrapper>
                  <span>{moment(work.createAt).format("lll")}</span>
                </WorkContent>
              </WorkGroup>
            </WorkWrapper>
          ))}
        </WorksContainer>
      </ReadWorksContainer>
    </Layout>
  );
};

export default ReadWorksByCategory;
