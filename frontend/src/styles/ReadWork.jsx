import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 75%;
  margin: auto;
  margin-bottom: 4vh;
  font-size: 2rem;

  @media screen and (max-width: 350px) {
    width: 90%;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 10%;
  margin-bottom: 7%;
  font-family: "Times New Roman", Times, serif;

  h1 {
    color: #2b1700;
    font-size: 5rem;
    text-align: center;
    font-weight: bold;
    font-family: "Times New Roman", Times, serif;
  }

  p {
    color: #2b1700;
    margin-top: 0.5rem;
    font-size: 2rem;
    font-style: italic;
    text-align: center;
    font-weight: lighter;
    letter-spacing: 1px;
    font-family: sans-serif;
  }

  @media screen and (max-width: 700px) {
    h1 {
      font-size: 3.5rem;
    }

    p {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 550px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;

export const HeaderTagCategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  width: 100%;
  margin: auto;
  margin-top: 10%;

  @media screen and (max-width: 700px) {
    margin-top: 15%;
  }

  @media screen and (max-width: 350px) {
    grid-template-columns: auto;
    width: 90%;
  }
`;

export const HeaderTagWrapper = styled.div`
  display: flex;
  justify-self: flex-end;
  padding: 1rem;

  span {
    text-transform: capitalize;
    letter-spacing: 1.5px;
    font-size: 2.5rem;
    color: #2b1700;
    margin-left: 0.5rem;
    border-radius: 1.5rem;
    padding: 1rem;
    font-family: "Times New Roman", Times, serif;
  }

  @media screen and (max-width: 768px) {
    span {
      font-size: 1.7rem;
      padding: 0.7rem;
    }
  }

  @media screen and (max-width: 550px) {
    span {
      letter-spacing: 1px;
      font-size: 1.2rem;
      padding: 0.5rem;
    }
  }

  @media screen and (max-width: 350px) {
    justify-self: flex-start;
    padding: 0;
    gap: 1rem;

    span {
      display: inline-block;
      padding: 0;
      margin: 0;
    }
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  justify-self: flex-start;
`;

export const CategoryLink = styled(Link)`
  text-decoration: none;
  font-size: 3rem;
  color: #2b1700;
  text-transform: capitalize;
  display: inline-block;
  font-weight: bolder;
  letter-spacing: 3px;
  font-family: "Times New Roman", Times, serif;

  @media screen and (max-width: 768px) {
    font-size: 2.3rem;
  }

  @media screen and (max-width: 550px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 350px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const HeaderImageWrapper = styled.div`
  width: 100%;
  margin: auto;

  img {
    width: 80%;
    display: block;
    margin: auto;
  }

  @media screen and (max-width: 350px) {
    img {
      width: 100%;
    }
  }
`;

export const HeaderContent = styled.div`
  display: grid;
  width: 80%;
  margin: auto;
  grid-template-columns: 6fr 6fr;

  @media screen and (max-width: 350px) {
    width: 100%;
    margin-bottom: 0.2rem;
  }
`;

export const HeaderContentLeft = styled.div`
  h5 {
    font-size: 2rem;
    color: #2b1700;
    opacity: 0.8;
  }

  @media screen and (max-width: 700px) {
    h5 {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 400px) {
    h5 {
      font-size: 1rem;
    }
  }
`;

export const HeaderContentRight = styled.div`
  h5 {
    width: 100%;
    font-size: 2.5rem;
    color: #2b1700;
    text-transform: capitalize;
    text-align: right;
    opacity: 0.8;
  }

  @media screen and (max-width: 700px) {
    h5 {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 400px) {
    h5 {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 350px) {
    h5 {
      font-size: 1.3rem;
    }
  }
`;

export const Division = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  color: #605e5e;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  text-transform: italic;

  p {
    width: 80%;
    margin: auto;
    text-align: center;
    color: black;
    font-size: 1.5rem;
    text-transform: italic;

    a {
      text-decoration: none;
      color: #2b1700;
      border-bottom: 1px solid black;
      font-size: 1.5rem;
      text-transform: italic;
    }

    em {
      text-decoration: none;
      color: #2b1700;
      border-bottom: 1px solid black;
      font-size: 1.5rem;
      text-transform: italic;
    }

    img {
      display: block;
      margin: 4rem auto;
      width: 100%;
    }
  }

  @media screen and (max-width: 350px) {
    p {
      width: 100%;
    }
  }
`;
