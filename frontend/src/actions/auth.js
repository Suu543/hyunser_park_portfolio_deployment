import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (signupInfo) => {
  try {
    console.log("signup", signupInfo);
    let response = await axios.post(
      `${process.env.REACT_APP_API}/register`,
      signupInfo
    );
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const activateAccount = async (token) => {
  try {
    console.log("activateAccount", token);
    let response = await axios.post(
      `${process.env.REACT_APP_API}/register/activate`,
      token
    );

    console.log("res", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signin = async (signinInfo) => {
  try {
    console.log("signin", signinInfo);
    let response = await axios.post(
      `${process.env.REACT_APP_API}/login`,
      signinInfo
    );

    console.log("res", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
