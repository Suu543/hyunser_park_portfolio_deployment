import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 60vh;
  display: flex;
  flex-flow: column nowrap;
  background: #f5f5f5;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  border: white 10px solid;

  h1 {
    font-size: 4vw;
    font-weight: lighter;
  }

  h3 {
    font-size: 2.5vw;
    font-weight: lighter;
    padding: 2rem;
  }

  p {
    font-size: 2vw;
    padding: 2rem;
  }

  @media screen and (max-width: 1400px) {
    h1 {
      font-size: 5vw;
      font-weight: lighter;
    }

    h3 {
      font-size: 4vw;
      font-weight: lighter;
      padding: 2rem;
    }

    p {
      font-size: 3vw;
      padding: 2rem;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const ActivateBtn = styled.button`
  background: #1990c6;
  color: white;
  padding: 3rem;
  font-size: 2vw;
  border: #ffffff solid 5px;
`;

export const HomeButton = styled.button`
  background: white;
  padding: 3rem;
  border: white solid 5px;

  a {
    font-size: 2vw;
    text-decoration: none;
    color: black;
  }
`;

export const AlertWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const SuccessAlert = styled.div`
  width: 100%;
  font-size: 15px;
  background: #cce5ff;
  color: #424095;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
`;

export const ErrorAlert = styled.div`
  width: 80%;
  font-size: 15px;
  background: #f8d7da;
  color: #721c59;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
`;
