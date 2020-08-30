import styled from "styled-components";
import { Link } from "react-router-dom";

export const ReadWorksContainer = styled.div`
  width: 80%;
  margin: auto;
`;

export const MainHeaderWrapper = styled.div`
  height: 13vh;
  text-align: center;

  h1 {
    font-size: 5rem;
    text-transform: uppercase;

    @media only screen and (max-width: 700px) {
      height: 6vh;
      font-size: 3rem;
    }
  }
`;

export const ImageWrapper = styled.div`
  margin: auto;
  margin-top: 5vh;
  margin-bottom: 10vh;
`;

export const WorksContainer = styled.div`
  width: 100%;
  /* max-width: 1400px; */
  margin: 0 auto;
  display: grid;
  grid-template-columns: 12fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  a {
    color: black;
  }

  @media all and (min-width: 800px) {
    grid-template-columns: 6fr 6fr;
  }

  @media all and (min-width: 1100px) {
    grid-template-columns: 4fr 4fr 4fr;
  }

  @media all and (max-width: 450px) {
    justify-content: center;
    align-items: center;
  }
`;

export const WorkWrapper = styled.div``;

export const WorkGroup = styled(Link)`
  background: white;
  text-decoration: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;

  position: relative;
  top: 0;
  transition: all 0.1s ease-in;

  :hover {
    top: -2px;
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.2);
  }

  a {
    text-decoration: none;
  }
`;

export const WorkThumb = styled.div`
  padding-bottom: 70%;
  background-image: url(${({ url }) => (url ? url : url)});
  background-size: cover;
  background-position: center center;
`;

export const WorkContent = styled.article`
  padding: 20px;
  flex: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    font-family: "Times New Roman", Times, serif;
    margin: 0;
    color: #2b1700;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    font-family: "Times New Roman", Times, serif;
    margin: 0;
    color: #2b1700;
  }

  span {
    color: #2b1700;
    font-size: 1.6rem;
    letter-spacing: 0.05em;
    font-weight: lighter;
    margin: 1em 0 0 0;
    font-family: "Times New Roman", Times, serif;
  }

  b {
    font-size: 1rem;
  }
`;

export const CategoryTitleWrapper = styled.div`
  width: 90%;
  margin: auto;
  margin-bottom: 5rem;

  h1 {
    color: black;
    font-size: 5rem;
    text-transform: capitalize;
    text-align: center;
  }

  @media all and (max-width: 450px) {
    margin-bottom: 3rem;

    h1 {
      font-size: 4rem;
    }
  }
`;

export const TagWrapper = styled.div`
  span {
    display: inline-block;
    font-family: "Times New Roman", Times, serif;
    color: #2b1700;
    font-weight: bold;
    font-size: 1.7rem;
    padding: 6px;
    margin-top: 1rem;
    margin-right: 1rem;
    border-radius: 6px;
  }
`;
