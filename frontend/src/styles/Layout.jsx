import styled from "styled-components";
import { Link } from "react-router-dom";

export const LayoutContainer = styled.div`
  background: white;
`;

export const NavWrapper = styled.header`
  width: 100%;
  height: 8vh;
  position: fixed;
  top: 0;
  background: white;
  z-index: 10;
`;

export const Navbar = styled.nav`
  position: relative;
  width: 100%;
  margin: auto;
  padding-top: 1.5rem;
`;

export const NavbarContent = styled.article`
  display: grid;
  grid-template-columns: auto auto;
`;

export const NavbarLeft = styled.section`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  font-size: ${({ axisy }) =>
    axisy < 50
      ? "4.20rem"
      : axisy < 100
      ? "4.05rem"
      : axisy < 170
      ? "3.90rem"
      : axisy < 230
      ? "3.75rem"
      : axisy < 300
      ? "3.60rem"
      : axisy < 370
      ? "3.45rem"
      : "3.30rem"};
  line-height: 3px;
  font-weight: lighter;
  font-family: "Times New Roman", Times, serif;
  text-decoration: none;
  color: #2b1700;
  margin-left: 30px;

  @media screen and (max-width: 450px) {
    font-size: ${({ axisy }) =>
      axisy < 50
        ? "3.5rem"
        : axisy < 100
        ? "3.4rem"
        : axisy < 170
        ? "3.3rem"
        : axisy < 230
        ? "3.2rem"
        : axisy < 300
        ? "3.1rem"
        : axisy < 370
        ? "3rem"
        : "2.9rem"};
  }

  @media screen and (max-width: 350px) {
    font-size: ${({ axisy }) =>
      axisy < 50
        ? "3rem"
        : axisy < 100
        ? "2.9rem"
        : axisy < 170
        ? "2.8rem"
        : axisy < 230
        ? "2.7rem"
        : axisy < 300
        ? "2.6rem"
        : axisy < 370
        ? "2.5rem"
        : "2.4rem"};
  }
`;

export const NavbarRight = styled.section`
  display: flex;
  align-items: flex-end;
  flex-flow: column;

  span {
    display: block;
    width: 3rem;
    font-weight: bolder;
    padding: 0;
    margin: 0;
    height: 4px;
    background: #2b1700;
    border-radius: 3px;
    margin-top: 7px;
    margin-right: 30px;

    :first-child {
      transform: ${(props) =>
        props.open ? "rotate(45deg) translate(7.5px, 7.5px)" : ""};
    }

    :nth-child(2n) {
      width: 2.5rem;
      display: ${(props) => (props.open ? "none" : "flex")};
    }

    :nth-child(3n) {
      transform: ${(props) => (props.open ? "rotate(-45deg)" : "")};
    }
  }
`;

export const NavbarUl = styled.ul`
  display: flex;

  a {
    text-decoration: none;
    color: #2b1700;
  }

  transition: transform 750ms;
  transform: ${(props) =>
    props.open ? "translateX(0%)" : "translateX(-100%)"};
  position: absolute;
  flex-flow: column nowrap;
  left: 0px;
  align-items: flex-start;
  justify-content: center;
  top: 8vh;
  z-index: 100;
  background: white;
  width: 100%;

  li {
    display: ${(props) => (props.open ? "flex" : "none")};
    font-size: 34px;
    font-family: "Times New Roman", Times, serif;
    font-weight: 900;
    padding: 2rem;
    margin-left: 1rem;
  }
`;

export const ContentContainer = styled.main`
  display: flex;
  flex-flow: column;
  width: 100%;
  margin: auto;

  @media screen and (max-width: 450px) {
    padding-top: 25px;
  }
`;
