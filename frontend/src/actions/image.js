import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const createCarouselImage = async (data, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/image`,
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

export const readImages = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/images`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeImage = async (id, token) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/image/${id}`,
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

export const updateImage = async (id, data, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/image/${id}`,
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
