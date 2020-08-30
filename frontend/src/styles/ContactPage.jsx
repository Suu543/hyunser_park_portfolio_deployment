import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContactContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  background: #000000;
  margin: auto;
`;

export const ContactPageTitle = styled.h1`
  width: 80%;
  margin: auto;
  padding-top: 1rem;
  color: #3f3f3f;
  text-align: center;
  font-size: 10vw;
  font-weight: 700;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
`;

export const ContactPageSubTitle = styled.h2`
  position: relative;
  width: 60%;
  margin: auto;
  color: white;
  text-align: center;
  font-size: 5rem;
  font-weight: 700;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
`;

export const ContactMain = styled.div`
  display: grid;
  margin: auto;
  margin-top: 3rem;
  width: 80%;
  grid-template-columns: 5.5fr 6.5fr;

  @media screen and (max-width: 650px) {
    grid-template-columns: auto;
  }
`;

export const ContactMainLeft = styled.section``;

export const ContactMainLeftTitle = styled.h1`
  font-size: 4rem;
  text-align: left;
  font-weight: 700;
  font-family: "Times New Roman", Times, serif;
  color: white;

  @media screen and (max-width: 900px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 690px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 650px) {
    font-size: 3.5rem;
    text-align: center;
  }
`;

export const ContactMainLeftContent = styled.article`
  display: flex;
  flex-flow: column wrap;

  @media screen and (max-width: 650px) {
    font-size: 2.5rem;

    i {
      font-size: 2rem;
    }

    align-items: center;
    justify-content: space-around;
  }
`;

export const ContactMainLeftContactTitle = styled.h1`
  margin-top: 2rem;
  font-size: 2.5rem;
  font-family: "Times New Roman", Times, serif;
  color: white;

  i {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 900px) {
    font-size: 2rem;

    i {
      font-size: 2rem;
    }
  }

  @media screen and (max-width: 690px) {
    font-size: 1.5rem;

    i {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 650px) {
    font-size: 2.5rem;

    i {
      font-size: 2rem;
    }
  }
`;

export const ContactMainLeftContactList = styled.ol`
  margin: 1.5rem;

  li {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: "Times New Roman", Times, serif;
  }
`;

export const ContactMainRight = styled.section`
  margin: auto;
  width: 90%;
`;

export const ContactFormWrapper = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
`;

export const ContactMainRightInput = styled.input`
  display: block;
  width: 90%;
  background: none;
  padding: 1.5rem;
  color: white;
  border: 1px solid white;
  font-size: 2rem;
  margin: 1.5rem auto;
`;

export const ContactMainRightTextArea = styled.textarea`
  display: block;
  width: 90%;
  background: none;
  padding: 1.2rem;
  color: white;
  border: 1px solid white;
  font-size: 2rem;
  margin: 1.5rem auto;
`;

export const ContactMainRightSubmitButton = styled.button`
  display: block;
  width: 70%;
  background: white;
  padding: 1rem;
  font-size: 2.3rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: auto;
  margin-top: 3rem;
  font-weight: bold;
  opacity: 0.8;

  :hover {
    opacity: 0.9;
  }

  :active {
    opacity: 1;
  }
`;

export const HomeLogoWrapper = styled.section`
  position: absolute;
  left: 34vw;
  top: 5vw;

  @media screen and (max-width: 650px) {
    left: 30%;
  }
`;

export const HomeLogo = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  font-size: 4vw;
  font-family: "Times New Roman", Times, serif;
  font-weight: 700;

  @media screen and (max-width: 650px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 550px) {
    font-size: 2.5rem;
  }
`;
