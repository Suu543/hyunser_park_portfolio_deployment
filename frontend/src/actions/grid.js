import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const createGridImage = async (data, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/grid`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("error");
    return error;
  }
};

export const readGridImages = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/grids`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeGridImage = async (id, token) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/grid/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateGridImage = async (id, data, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/grid/${id}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
