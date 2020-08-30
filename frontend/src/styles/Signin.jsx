import styled from "styled-components";

export const Wrapper = styled.section`
  background: #f5f5f5;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

export const Row = styled.article`
  width: 25%;
  min-height: 70%;
  background: #ffffff;
  border: #e5e5e5 2px solid;

  h1 {
    font-size: 3rem;
    font-weight: lighter;
    text-align: center;
    padding-top: 4rem;
    padding-bottom: 2rem;
  }

  @media screen and (max-width: 1300px) {
    width: 40%;
    min-height: 70%;
  }

  @media screen and (max-width: 1000px) {
    width: 50%;
    min-height: 70%;
  }

  @media screen and (max-width: 700px) {
    width: 60%;
    min-height: 70%;
  }

  @media screen and (max-width: 500px) {
    width: 80%;
    min-height: 80%;

    h1 {
      font-size: 2.5rem;
    }
  }

  @media screen and (max-width: 400px) {
    h1 {
      font-size: 1.8rem;
    }

    width: 100%;
    min-height: 80%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column;

  input {
    font-size: 1.5rem;
    width: 80%;
    margin: auto;
    padding: 2.5rem;
    border: 0;
    border-bottom: #b2b2b2 solid 1px;
  }

  button {
    margin: 3rem;
    padding: 2rem;
    font-size: 15px;
    color: white;
    background: #243dae;
  }

  @media screen and (max-width: 500px) {
    input {
      font-size: 1.3rem;
    }

    button {
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
`;

export const SuccessAlert = styled.div`
  background: #cce5ff;
  color: black;
  width: 80%;
  border-radius: 3px;
  font-size: 1.5rem;
  margin: auto;
  margin-top: 3rem;
  padding: 0.8rem;

  @media screen and (max-width: 500px) {
    margin-top: 1.5rem;
    font-size: 1.5rem;
  }
`;

export const ErrorAlert = styled.div`
  background: #f8d7da;
  color: black;
  width: 80%;
  border-radius: 3px;
  font-size: 1.5rem;
  margin: auto;
  margin-top: 3rem;
  padding: 0.8rem;

  @media screen and (max-width: 500px) {
    margin-top: 1.5rem;
    font-size: 1.5rem;
  }
`;

export const ReferenceLinks = styled.article`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10%;
  font-size: 2rem;

  a {
    margin-top: 3px;
    text-decoration: none;
    color: #243dae;
  }
`;
