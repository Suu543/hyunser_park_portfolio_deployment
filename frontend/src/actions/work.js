import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const createWork = async (formData, token) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API}/work`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const imageUpload = (formData) => {
  const response = axios.post(
    `${process.env.REACT_APP_API}/work/upload`,
    formData
  );
  return response;
};

export const listReferencedByCategory = async (slug) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API}/works/${slug}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const allWorks = async () => {
  try {
    let response = await axios.get(`${process.env.REACT_APP_API}/works`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const singleWork = async (category, slug) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API}/works/${category}/${slug}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const readSingleWork = async (slug) => {
  try {
    let response = await axios.get(`${process.env.REACT_APP_API}/work/${slug}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeWork = async (slug, token) => {
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_API}/work/${slug}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getRecentWorks = async () => {
  try {
    let response = await axios.get(`${process.env.REACT_APP_API}/works/recent`);
    console.log("getRecent", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
