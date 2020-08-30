/* eslint-disable */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router";
import useReactRouter from "use-react-router";
import { singleWork, listReferencedByCategory } from "../../actions/work";
import styled from "styled-components";
import Layout from "../../core/Layout";

import {
  Container,
  HeaderImageWrapper,
  HeaderWrapper,
  HeaderTagCategoryWrapper,
  HeaderTagWrapper,
  CategoryWrapper,
  CategoryLink,
  Division,
  HeaderContent,
  HeaderContentLeft,
  HeaderContentRight,
} from "../../styles/ReadWork";

import {
  WorksContainer,
  WorkWrapper,
  WorkGroup,
  WorkThumb,
  WorkContent,
  TagWrapper,
} from "../../styles/ReadWorks";

const RelatedWorksTitleWrapper = styled.h1`
  width: 100%;
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  color: #2b1700;
  margin: 10vh auto;

  @media screen and (max-width: 700px) {
    font-size: 3.5rem;
  }
`;

const RelatedWorksContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const ReadSingleWork = () => {
  const { location } = useReactRouter();
  const [relatedWorks, setRelatedWorks] = useState([]);
  const [work, setWork] = useState({
    artist: "",
    categories: [],
    tags: [],
    excerpt: "",
    image: {},
    title: "",
    body: "",
  });
  const [url, setURL] = useState("");
  const { category, slug } = useParams();
  const { artist, categories, tags, excerpt, image, title, body } = work;

  const loadSingleWork = async () => {
    try {
      const newWork = await singleWork(category, slug);
      const { artist, categories, tags, excerpt, image, title, body } = newWork;
      setWork({ artist, categories, tags, excerpt, image, title, body });
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadRelatedWorks = async () => {
    try {
      const works = await listReferencedByCategory(category);
      const results = works.filter((w) => w.slug !== slug);
      console.log("results", results);
      setRelatedWorks([...results]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    loadSingleWork();
    loadRelatedWorks();
    setURL(location);
  }, [url]);

  return (
    <Layout>
      <Container>
        <HeaderTagCategoryWrapper>
          <CategoryWrapper>
            <CategoryLink to={`/works/${category}`}>{category}</CategoryLink>
          </CategoryWrapper>
          <HeaderTagWrapper>
            {tags.map((t, i) => (
              <span key={i}>#{t.title}</span>
            ))}
          </HeaderTagWrapper>
        </HeaderTagCategoryWrapper>

        <HeaderWrapper>
          <h1>{title}</h1>
          <p>Published by {artist}</p>
          <br />
        </HeaderWrapper>

        <HeaderContent>
          <HeaderContentLeft>
            <h5>{moment(work.createAt).format("lll")}</h5>
          </HeaderContentLeft>
          <HeaderContentRight>
            <h5>{category}</h5>
          </HeaderContentRight>
        </HeaderContent>

        <HeaderImageWrapper>
          <img src={image.url} />
        </HeaderImageWrapper>

        <Division dangerouslySetInnerHTML={{ __html: body }}></Division>

        <RelatedWorksTitleWrapper>Related Works</RelatedWorksTitleWrapper>
        <WorksContainer>
          {relatedWorks.map((work, index) => (
            <WorkWrapper key={index}>
              <WorkGroup
                key={index}
                onClick={() => setURL(`/works/${category}/${work.slug}`)}
                to={`/works/${category}/${work.slug}`}
              >
                <WorkThumb url={work.image.url} />
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
      </Container>
    </Layout>
  );
};

export default ReadSingleWork;
