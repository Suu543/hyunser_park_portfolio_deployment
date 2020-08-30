import styled from "styled-components";
import { Link } from "react-router-dom";

export const PortfolioContainer = styled.section`
  width: 100%;
  background: #fff;
  margin-top: 13vh;
`;

export const PortfolioTitleWrapper = styled.header`
  width: 90%;
  margin: auto;

  h1 {
    font-size: 4rem;
    font-family: "Times New Roman", Times, serif;
    font-weight: lighter;
  }

  hr {
    width: 100%;
    margin-top: 2rem;
    border: 0.5px solid black;
    opacity: 0.2;
  }
`;

export const TitleWrapper = styled.section`
  width: 90%;
  margin: auto;
  margin-top: 10vh;

  h1 {
    font-family: "Times New Roman", Times, serif;
    font-size: 4rem;
    padding: 1rem;
    font-weight: lighter;
  }

  @media screen and (max-width: 450px) {
    h1 {
      font-family: "Times New Roman", Times, serif;
      font-size: 3rem;
      padding: 1rem;
      font-weight: bold;
    }
  }

  hr {
    width: 100%;
    margin-top: 2rem;
    border: 0.5px solid black;
    opacity: 0.2;
  }
`;

export const RecentWorksContainer = styled.section`
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  background: white;

  display: grid;

  grid-template-columns: 12fr;
  grid-template-rows: auto;
  grid-gap: 2rem;

  @media screen and (min-width: 800px) {
    grid-template-columns: 6fr 6fr;
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: 4fr 4fr 4fr;
  }

  @media screen and (max-width: 400px) {
    align-items: center;
    justify-content: center;
  }
`;

export const RecentWorkContainer = styled.section`
  width: 100%;
`;

export const PortfolioWorkContainer = styled.section`
  width: 100%;
  padding: 2rem;
  margin: auto;
  background: white;

  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 2rem;

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 850px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CategoryWrapper = styled.section`
  background: #fff;
`;

export const CategoryCard = styled(Link)`
  background: #fafafa;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;

  position: relative;
  top: 0;
  transition: all 0.1s ease-in;

  :hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }

  article {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    padding: 20px;
    flex: 1;
  }

  h1 {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-size: 3rem;
    padding: 3rem 0;
    margin: 0;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;

export const Thumb = styled.div`
  padding-bottom: 70%;
  background-image: url(${({ url }) => (url ? url : url)});
  background-size: cover;
  background-position: center center;
`;

export const WorkByCategoryContainer = styled.section`
  width: 90%;
  margin: auto;

  h1 {
    font-family: "Times New Roman", Times, serif;
    font-size: 4rem;
    text-transform: capitalize;
    font-weight: lighter;
    margin-top: 5rem;
  }

  hr {
    width: 100%;
    margin: 2.5rem auto;
    border: 0.5px solid black;
    opacity: 0.2;
  }
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: auto;
  margin-top: 4rem;
  font-size: 2rem;
  padding: 1.2rem;
  width: 25%;
  background: gray;
  color: white;
  border: none;
  opacity: 0.7;
  cursor: pointer;

  :hover,
  :active {
    opacity: 1;
  }
`;
