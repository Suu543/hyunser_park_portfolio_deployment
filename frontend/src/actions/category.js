import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const create = async (data, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/category`,
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

export const singleCategory = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/category/${slug}`
    );
    console.log("singleCategory", response);

    return response.data;
  } catch (error) {
    console.log("error");
    return error;
  }
};

export const update = async (slug, data, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/category/${slug}`,
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

export const getCategories = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/categories`);
    console.log("response,", response);
    return response.data;
  } catch (error) {
    console.log("error");
    return error;
  }
};

export const removeCategory = async (slug, token) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/category/${slug}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error");
    return error;
  }
};
