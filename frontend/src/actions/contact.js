import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const contactFromClient = (contactInfo) => {
  try {
    let response = axios.post(
      `${process.env.REACT_APP_API}/contact`,
      contactInfo
    );
    console.log("sentFromClient", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const contactEmailFromClient = (contactInfo) => {
  try {
    let response = axios.post(
      `${process.env.REACT_APP_API}/contactMail`,
      contactInfo
    );
    console.log("sentFromClient", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
