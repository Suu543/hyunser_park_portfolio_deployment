import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const create = async (tag, token) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/tag`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(tag),
    });

    return response;
  } catch (error) {
    console.log("error");
    return error;
  }
};
