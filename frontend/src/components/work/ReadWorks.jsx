import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import { allWorks, removeWork } from "../../actions/work";
import { getCookie } from "../../helpers/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WorkContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  margin-top: 10vh;
`;

const WorkTitleWrapper = styled.section`
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

const WorkCreateFeature = styled.section`
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

const WorkCreateFeatureLink = styled(Link)`
  text-decoration: none;
`;

const WorkWrapper = styled.article`
  display: flex;
  flex-flow: column wrap;
  width: 80%;
  margin: auto;
`;

const WorkCard = styled.article`
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

const WorkFeatureWrapper = styled.article`
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

const ReadWorks = () => {
  const token = getCookie("token");
  const [works, setWorks] = useState([]);

  useEffect(() => {
    initAllWorks();
  }, []);

  const initAllWorks = async () => {
    try {
      const response = await allWorks();
      setWorks([...response]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteWork = async (slug) => {
    try {
      const deletedWork = await removeWork(slug, token);
      if (deletedWork) alert(`Successfully Delete ${slug} work...`);
      await initAllWorks();
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Do you really want to delete this work?");
    if (answer) deleteWork(slug);
  };

  return (
    <Layout>
      <WorkContainer>
        <WorkTitleWrapper>
          <h1>Admin - Work</h1>
        </WorkTitleWrapper>
        <WorkCreateFeature>
          <WorkCreateFeatureLink to="/admin/work/create">
            <button>Create Work</button>
          </WorkCreateFeatureLink>
        </WorkCreateFeature>
        <WorkWrapper>
          {works &&
            works.length > 0 &&
            works.map((w, i) => (
              <WorkCard key={i}>
                <h1>{w.title}</h1>
                <WorkFeatureWrapper>
                  <button onClick={() => deleteConfirm(w.slug)}>Delete</button>
                </WorkFeatureWrapper>
              </WorkCard>
            ))}
        </WorkWrapper>
      </WorkContainer>
    </Layout>
  );
};

export default ReadWorks;
