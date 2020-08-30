import React from "react";
import { getCookie, getLocalStorage } from "../helpers/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// let JWT_SECRET =
//   "QgO67RmtkeGmREWzfkCV2jXgv0PPgTLOdnSpJUHJ12am5zfYhNDF3Lqqi_lXd0134_ZdPjPUT7F7fPFuzo58kiscfO0DHBo4H";

const RestrictRoute = ({ component: Component, fallback: Fallback, exact }) => {
  let token = getCookie("token");
  let user = JSON.parse(getLocalStorage("user"));
  console.log("proce", process.env.REACT_APP_JWT_SECRET);

  let validToken = jwt.verify(
    token,
    process.env.REACT_APP_JWT_SECRET,
    function (err, decoded) {
      if (err) return false;
      return true;
    }
  );

  return validToken && user.role === "admin" ? <Component /> : <Fallback />;
};

export default RestrictRoute;
