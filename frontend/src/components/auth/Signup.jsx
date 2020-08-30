import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../actions/auth";
import {
  Wrapper,
  Row,
  Form,
  SuccessAlert,
  ErrorAlert,
  ReferenceLinks,
} from "../../styles/Signup";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmed: "",
    error: "",
    success: false,
    buttonText: "Register",
  });

  const {
    name,
    email,
    password,
    error,
    success,
    buttonText,
    confirmed,
  } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: "", success: "", [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Registering..." });

    if (password === confirmed) {
      try {
        const response = await signup({ name, email, password });
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          confirmed: "",
          buttonText: "Submitted",
          success: response.data.message,
        });
      } catch (error) {
        setValues({ ...values, error: error.response.data.error });
      }
    } else {
      setValues({
        ...values,
        error: "Your password and confirmation password do not match",
      });
    }
  };

  const signupForm = () => (
    <Wrapper>
      <Row>
        <h1>Sign up</h1>
        <Form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            placeholder="name"
            required
          />
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
          <input
            value={confirmed}
            onChange={handleChange("confirmed")}
            type="password"
            placeholder="Password Confirmed"
            required
          />
          {success && <SuccessAlert>{success}</SuccessAlert>}
          {error && <ErrorAlert>{error}</ErrorAlert>}

          <button>{buttonText}</button>
        </Form>

        <ReferenceLinks>
          <Link to="/">Go Back Home</Link>
          <Link to="/login">Already a member?</Link>
        </ReferenceLinks>
      </Row>
    </Wrapper>
  );

  return <React.Fragment>{signupForm()}</React.Fragment>;
};

export default Signup;
