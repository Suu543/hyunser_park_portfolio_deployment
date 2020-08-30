import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { activateAccount } from "../../actions/auth";
import {
  Container,
  ButtonWrapper,
  ActivateBtn,
  HomeButton,
  AlertWrapper,
  SuccessAlert,
  ErrorAlert,
} from "../../styles/AccountActivation";

const AccountActivation = () => {
  let { token } = useParams();

  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, buttonText, success, error } = state;

  useEffect(() => {
    if (token) {
      const { name } = jwt.decode(token);
      setState({ ...state, name, token });
    }
  }, [state, token]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    console.log("Activate Account");

    try {
      const response = await activateAccount({ token });
      console.log("response", response);
      setState({
        ...state,
        name: "",
        token: "",
        buttonText: "Activated!",
        success: response.data.message,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Activate Account",
        error: "expired token please try registration process again...",
      });
    }
  };

  const accountActivation = () => (
    <Container>
      <h1>Activate Your Account</h1>
      <h3>Hello, {name}</h3>
      <p>
        I am happy to announce my modeling work portfolio. Please, activate your
        account!
      </p>
      <ButtonWrapper>
        <ActivateBtn onClick={clickSubmit}>{buttonText}</ActivateBtn>
        <HomeButton>
          <Link to="/">Just Visit this site</Link>
        </HomeButton>
      </ButtonWrapper>
      <AlertWrapper>
        {success && <SuccessAlert>{success}</SuccessAlert>}
        {error && <ErrorAlert>{error}</ErrorAlert>}
      </AlertWrapper>
    </Container>
  );

  return <React.Fragment>{accountActivation()}</React.Fragment>;
};

export default AccountActivation;
