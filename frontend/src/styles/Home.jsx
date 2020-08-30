import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-flow: column wrap;
  /* background: #f3efdf; */
  background: #ffffff;

  width: 100%;
`;

export const SliderWrapper = styled.article`
  width: 80%;
  margin: 11vh auto;
  min-height: 100vh;

  @media all and (max-width: 1200px) {
    min-height: 50vh;
  }

  @media all and (max-width: 800px) {
    margin: 8vh auto;
    min-height: 40vh;
  }

  @media all and (max-width: 650px) {
    min-height: 35vh;
  }

  @media all and (max-width: 500px) {
    width: 100%;
    margin: 8vh auto;
    min-height: 40vh;
  }

  @media all and (max-width: 400px) {
    margin: 6vh auto;
    min-height: 40vh;
  }
`;

export const IntroductionWrapper = styled.article`
  width: 100%;
  margin: auto;
  background: white;

  @media all and (max-width: 400px) {
    height: 115vh;
  }
`;

export const IntroductionContent = styled.section`
  display: flex;
  width: 90%;
  flex-flow: column wrap;
  row-gap: 3rem;
  margin: auto;
  margin-bottom: 3rem;
  margin-top: 3rem;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 8rem;
    align-self: center;
    color: #2b1700;
    margin: auto;
    text-transform: uppercase;
  }

  h3 {
    width: 75%;
    margin: auto;
    font-size: 3vw;
    align-self: flex-start;
    font-weight: lighter;
    color: #2b1700;
  }

  b {
    font-size: 3vw;
    color: #2b1700;
  }

  p {
    width: 75%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3rem;
    font-weight: 300;
    margin: auto;
    color: #2b1700;
  }

  @media all and (max-width: 1250px) {
    h1 {
      font-size: 6rem;
    }

    p {
      font-size: 1.5rem;
    }
  }

  @media all and (max-width: 1000px) {
    h1 {
      font-size: 4.5rem;
    }
  }

  @media all and (max-width: 864px) {
    h1 {
      font-size: 6rem;
    }

    h3 {
      font-size: 4rem;
    }
  }

  @media all and (max-width: 500px) {
    width: 100%;

    h1 {
      font-size: 4.5rem;
      text-align: center;
    }

    h3 {
      font-size: 3.8rem;
      width: 80%;
    }

    p {
      width: 85%;
    }
  }

  @media all and (max-width: 320px) {
    h1 {
      font-size: 4rem;
    }

    h3 {
      font-size: 3.5rem;
    }
  }
`;

export const IntroductionSizeWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 90%;
  margin: auto;
  align-items: center;
`;

export const IntroductionSizeTitle = styled.h3`
  font-size: 4vw;
  font-weight: 700;
  color: #2b1700;
  margin: auto;
  font-family: "Times New Roman", Times, serif;

  b {
    font-size: 4vw;
    color: #2b1700;
  }

  @media all and (max-width: 1250px) {
    h1 {
      font-size: 6rem;
    }

    p {
      font-size: 1.5rem;
    }
  }

  @media all and (max-width: 1000px) {
    h1 {
      font-size: 4.5rem;
    }
  }

  @media all and (max-width: 864px) {
    h1 {
      font-size: 6rem;
    }

    h3 {
      font-size: 4rem;
    }

    b {
      font-size: 3rem;
    }
  }

  @media all and (max-width: 500px) {
    width: 100%;

    h1 {
      font-size: 4.5rem;
      text-align: center;
    }

    h3 {
      font-size: 3.8rem;
      width: 80%;
    }

    p {
      width: 85%;
    }

    b {
      font-size: 3.5rem;
    }
  }

  @media all and (max-width: 320px) {
    h1 {
      font-size: 4rem;
    }

    h3 {
      font-size: 3.5rem;
    }
  }
`;

export const CentiInchButtonWrapper = styled.article`
  span {
    font-size: 4rem;
  }
`;

export const CentimeterButton = styled.button`
  border: none;
  font-size: 4rem;
  background: none;
  outline: none;
  font-weight: bold;
  border-bottom: ${({ centimeter }) =>
    !centimeter ? "1px solid black" : "none"};

  :hover,
  :active {
    font-size: 4.5rem;
  }

  @media all and (max-width: 500px) {
    font-size: 3rem;

    :hover,
    :active {
      font-size: 3.3rem;
    }
  }
`;
export const InchButton = styled.button`
  border: none;
  font-size: 4rem;
  background: none;
  outline: none;
  font-weight: bold;

  border-bottom: ${({ centimeter }) =>
    centimeter ? "1px solid black" : "none"};

  :hover,
  :active {
    font-size: 4.5rem;
  }

  @media all and (max-width: 500px) {
    font-size: 3rem;

    :hover,
    :active {
      font-size: 3.3rem;
    }
  }
`;

export const IntroductionSizeCmWrapper = styled.article`
  width: 100%;
  margin: auto;
  display: ${({ centimeter }) => (centimeter ? "none" : "grid")};
  padding: 2rem;
  grid-template-columns: auto auto auto;
  grid-gap: 1rem;
  background: white;
  align-items: center;
  justify-content: space-evenly;

  span {
    font-size: 2.6rem;
    padding-right: 1rem;
    font-family: "Times New Roman", Times, serif;
    letter-spacing: 2px;
  }

  @media all and (max-width: 1000px) {
    span {
      font-size: 2.2rem;
    }
  }

  @media all and (max-width: 850px) {
    span {
      font-size: 2rem;
    }
  }

  @media all and (max-width: 700px) {
    span {
      font-size: 1.5rem;
    }
  }
`;

export const IntroductionSizeInchWrapper = styled.article`
  width: 100%;
  margin: auto;
  display: ${({ centimeter }) => (!centimeter ? "none" : "grid")};
  padding: 2rem;
  grid-template-columns: auto auto auto;
  grid-gap: 1rem;
  background: white;
  align-items: center;
  justify-content: space-evenly;

  span {
    font-size: 2.6rem;
    padding-right: 1rem;
    font-family: "Times New Roman", Times, serif;
  }

  @media all and (max-width: 1000px) {
    span {
      font-size: 2.2rem;
    }
  }

  @media all and (max-width: 850px) {
    span {
      font-size: 2rem;
    }
  }

  @media all and (max-width: 700px) {
    span {
      font-size: 1.5rem;
    }
  }
`;

export const IntroductionAboutMeWrapper = styled.article`
  display: flex;
  width: 90%;
  flex-flow: column wrap;
  margin: auto;
  margin-bottom: 5vh;

  h3 {
    width: 85%;
    margin: auto;
    font-size: 3vw;
    text-align: left;
    font-weight: lighter;
    color: #2b1700;
  }

  b {
    font-size: 4vw;
    color: #2b1700;
  }

  p {
    width: 80%;
    font-family: "Times New Roman", Times, serif;
    font-size: 3rem;
    font-weight: 300;
    margin: auto;
    margin-top: 2rem;
    color: #2b1700;
  }

  @media all and (max-width: 1250px) {
    p {
      font-size: 3rem;
    }
  }

  @media all and (max-width: 864px) {
    p {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 4rem;
    }

    b {
      font-size: 4rem;
    }
  }

  @media all and (max-width: 500px) {
    width: 100%;

    h3 {
      font-size: 3.8rem;
      width: 80%;
    }

    p {
      font-size: 2rem;
    }
  }

  @media all and (max-width: 400px) {
    h3 {
      font-size: 3.5rem;
      font-weight: 700;
    }
  }
`;

export const IntroductionImageWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  img {
    width: 100%;
  }
`;

export const CategoryTitle = styled.div`
  width: 100%;
  margin: auto;
  color: #2b1700;

  padding: 4rem;

  h1 {
    font-size: 5rem;
    font-weight: 500;
    text-align: center;
  }

  b {
    font-size: 5rem;
  }

  @media all and (max-width: 500px) {
    margin-top: 7rem;
    padding: 0;

    h1 {
      font-size: 3rem;
    }

    b {
      font-size: 3rem;
    }
  }

  @media all and (max-width: 400px) {
    margin-top: 10rem;
  }

  @media all and (max-width: 340px) {
    margin-top: 20rem;
  }
`;

export const CategoryContainer = styled.div`
  width: 100%;
  padding: 2rem;
  margin: auto;
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

export const CategoryWrapper = styled.div`
  background: white;
`;

export const CategoryCard = styled(Link)`
  background: #fafafa;
  text-decoration: none;
  color: #2b1700;
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
    background: white;

    padding: 20px;
    flex: 1;

    h1 {
      color: #2b1700;
      background: white;
      font-size: 2rem;

      @media all and (max-width: 500px) {
        font-size: 2rem;
      }
    }
  }

  h1 {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-size: 3rem;
    padding: 3rem 0;
    margin: 0;
    color: #2b1700;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;

export const Thumb = styled.div`
  padding-bottom: 80%;
  background-image: url(${({ url }) => (url ? url : url)});
  background-size: cover;
  background-position: center center;
`;

export const ImageContainer = styled.article`
  width: 90%;
  margin: 3rem auto;

  div {
    justify-content: center;
    align-items: center;
    div {
      width: 100%;
      gap: 5px;
    }
  }

  @media all and (max-width: 1100px) {
    margin: 2rem auto;

    div {
      div {
        gap: 0;
      }
    }
  }
`;

export const SayingContainer = styled.section`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  background: white;
  color: #2b1700;
  padding: 10rem;
  margin-top: 2rem;

  @media all and (max-width: 600px) {
    padding: 1rem;
    margin: 0;
  }
`;

export const SayingWrapper = styled.div`
  width: 100%;
  margin: auto;

  h1 {
    font-size: 4rem;
    text-align: center;
    font-style: italic;
    font-weight: lighter;
    font-family: "Times New Roman", Times, serif;
  }

  h3 {
    font-size: 3rem;
    text-align: right;
    padding-bottom: 4rem;
    padding-top: 2rem;
    font-weight: lighter;
    font-family: "Times New Roman", Times, serif;
  }

  @media all and (max-width: 800px) {
    h1 {
      font-size: 2.8rem;
    }

    h3 {
      font-size: 2.3rem;
    }
  }

  @media all and (max-width: 600px) {
    h1 {
      font-size: 2.4rem;
    }

    h3 {
      font-size: 2rem;
    }
  }

  @media all and (max-width: 450px) {
    margin-top: 6rem;

    h1 {
      font-size: 2rem;
      text-align: center;
    }

    h3 {
      font-size: 1.3rem;
    }
  }
`;

export const Contact = styled.section`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  background: black;
  align-items: center;
  justify-content: center;
  padding-top: 7rem;
  padding-bottom: 7rem;
`;

export const ContactMultiPurposeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  border: 3px solid black;
`;

export const ContactTitle = styled.h1`
  color: white;
  font-size: 2rem;
  font-family: "Times New Roman", Times, serif;
`;

export const ContactSubTitle = styled.h1`
  color: white;
  font-size: 4.5rem;

  @media all and (max-width: 400px) {
    font-size: 3.2rem;
  }
`;

export const ContactForm = styled.form`
  display: grid;
  font-family: "Times New Roman", Times, serif;
  width: 100%;
  justify-content: center;
  align-items: center;
  grid-template-columns: 7.5fr 2.5fr;
  grid-gap: 1rem;
  margin-top: 5vh;

  input {
    font-size: 1rem;
    background: none;
    border-width: 2px;
    color: rgba(160, 160, 159, 1);
    padding: 1rem;
    border: white 1px solid;
    outline: none;
    font-weight: lighter;
  }

  button {
    font-size: 1.2rem;
    background: white;
    border: white 2px solid;
    color: black;
    padding: 0.9rem;
    font-family: arial;
    font-weight: bold;
  }

  @media all and (max-width: 450px) {
    grid-template-columns: auto;

    input {
      display: block;
      width: 70vw;
    }

    button {
      display: block;
      width: 70vw;
    }
  }
`;

export const ContactSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-top: 3rem;
  height: 5vh;

  a {
    text-decoration: none;
    color: white;
  }

  i {
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }
`;

export const LoadMoreButton = styled.button`
  display: block;
  padding: 1rem;
  width: 300px;
  margin: auto;
  margin-top: 5rem;
  font-size: 2rem;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid #dddddd;
  border-radius: 10px;
  font-weight: lighter;
  opacity: 0.8;
  cursor: pointer;

  :hover,
  :active {
    opacity: 1;
  }
`;
