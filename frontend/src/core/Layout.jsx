import React, { useState } from "react";
import useScroll from "../events/useScroll";
import { getCookie, getLocalStorage } from "../helpers/auth";
import { Link } from "react-router-dom";
import {
  LayoutContainer,
  NavWrapper,
  Navbar,
  NavbarContent,
  NavbarLeft,
  NavLink,
  NavbarRight,
  NavbarUl,
  ContentContainer,
} from "../styles/Layout";
import jwt from "jsonwebtoken";
let JWT_SECRET =
  "QgO67RmtkeGmREWzfkCV2jXgv0PPgTLOdnSpJUHJ12am5zfYhNDF3Lqqi_lXd0134_ZdPjPUT7F7fPFuzo58kiscfO0DHBo4H";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const { axisy } = useScroll();
  let token = getCookie("token");
  let user = JSON.parse(getLocalStorage("user"));
  let validToken = jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) return false;
    return true;
  });

  return (
    <NavWrapper>
      <Navbar>
        <NavbarContent>
          <NavbarLeft>
            <NavLink axisy={axisy} to="/">
              Hyunser Park
            </NavLink>
          </NavbarLeft>
          <NavbarRight open={open} onClick={() => setOpen(!open)}>
            <span></span>
            <span></span>
            <span></span>
            <NavbarUl open={open} onClick={() => setOpen(!open)}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {validToken && user && user.role === "admin" && (
                <li>
                  <Link to="/admin/features">Admin</Link>
                </li>
              )}
            </NavbarUl>
          </NavbarRight>
        </NavbarContent>
      </Navbar>
    </NavWrapper>
  );
};

const Layout = ({ children }) => (
  <LayoutContainer>
    <Nav />
    <ContentContainer>{children}</ContentContainer>
  </LayoutContainer>
);

export default Layout;
