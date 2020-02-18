import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TopHeader from "./topHeader";
import BottomHeader from "./bottomHeader";
import SideBar from "./sideBar.jsx";

const Header = props => {
  const ref = useRef(null);
  const [burgerMenu, setBurgerMenu] = useState(false);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = e => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      e.target.id !== "burgerMenu" &&
      e.target.id !== "burgerInner"
    ) {
      setBurgerMenu(false);
    }
  };

  const handleBurgerClick = () => {
    setBurgerMenu(!burgerMenu);
  };

  return (
    <Container>
      <TopHeader />
      <BottomHeader
        burgerMenu={burgerMenu}
        handleBurgerClick={handleBurgerClick}
      />
      <SideBar
        ref={ref}
        burgerMenu={burgerMenu}
        handleBurgerClick={handleBurgerClick}
      />
    </Container>
  );
};

export default Header;

const Container = styled.header`
  border-bottom: 2px solid var(--light-border-color-soft);
`;
