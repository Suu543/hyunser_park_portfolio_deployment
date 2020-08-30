import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../../actions/auth";
import { authenticate } from "../../helpers/auth";
import {
  Wrapper,
  Row,
  Form,
  SuccessAlert,
  ErrorAlert,
  ReferenceLinks,
} from "../../styles/Signin";

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    buttonText: "Login",
  });

  const { email, password, error, success, buttonText } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Registering..." });

    try {
      const response = await signin({ email, password });
      setValues({
        ...values,
        email: "",
        password: "",
        success: response.data.message,
      });
      //   console.log("response", response.data);
      authenticate(response, () => {
        history.replace("/");
      });
    } catch (error) {
      setValues({ ...values, error: "Invalid Email or Password" });
    }
  };

  const signinForm = () => (
    <Wrapper>
      <Row>
        <h1>Sign in</h1>
        <Form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            placeholder="Password"
            required
          />

          {success && <SuccessAlert>{success}</SuccessAlert>}
          {error && <ErrorAlert>{error}</ErrorAlert>}

          <button>{buttonText}</button>
        </Form>

        <ReferenceLinks>
          <Link to="/">Go Back Home</Link>
          <Link to="/signup">Don't have an account?</Link>
        </ReferenceLinks>
      </Row>
    </Wrapper>
  );

  return <React.Fragment>{signinForm()}</React.Fragment>;
};

export default Signin;
