import styled from "styled-components";
import { Link } from "react-router-dom";

export const AdminDashboardContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  background: #f5f5f5;
`;

export const AdminDashboardTitleWrapper = styled.header`
  width: 80%;
  margin: auto;
  margin-top: 10vh;

  h1 {
    font-size: 4rem;
    padding: 1rem;
    color: black;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  @media screen and (max-width: 450px) {
    h1 {
      font-size: 3rem;
    }
  }
`;

export const AdminFeaturesContainer = styled.section`
  width: 100%;
`;

export const AdminFeaturesWrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 2rem;
  gap: 2rem;

  @media screen and (max-width: 800px) {
    grid-template-columns: auto auto;
  }
`;

export const FeatureLink = styled(Link)`
  text-decoration: none;
  color: #f3efdf;
  align-self: center;
`;

export const Features = styled.article`
  text-align: center;
  background: #9b8271;
  color: white;
  font-size: 3rem;
  padding: 3rem;
  width: 250px;

  :hover {
    display: absolute;
    background: #f3efdf;
    top: -2px;
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.2);
    color: black;
  }

  @media screen and (max-width: 750px) {
    width: 200px;
    font-size: 2rem;
  }

  @media screen and (max-width: 450px) {
    width: 150px;
    font-size: 1.8rem;
  }

  @media screen and (max-width: 390px) {
    width: 120px;
    font-size: 1.5rem;
  }
`;

export const SummaryContainer = styled.section`
  width: 80%;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  margin: auto;
  margin-top: 3%;
  margin-bottom: 3%;
  background: #ffffff;
  border-radius: 10px;

  h1 {
    font-size: 4rem;
    padding: 1rem;
    color: black;
    background: #f5f5f5;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  @media screen and (max-width: 450px) {
    h1 {
      font-size: 3rem;
    }
  }
`;

export const Summary = styled.article`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  margin: auto;
  padding: 2rem;
  border: 1px solid black;

  a {
    text-decoration: none;
    font-size: 3rem;
    font-weight: bold;
    color: black;
  }

  span {
    font-size: 3rem;
    font-weight: bold;
  }

  @media screen and (max-width: 450px) {
    a {
      font-size: 2rem;
    }

    span {
      font-size: 2rem;
      font-weight: bold;
    }
  }
`;
