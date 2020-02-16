import React, { useState } from "react";
import styled from "styled-components";
import TopHeader from "./topHeader";
import BottomHeader from "./bottomHeader";

const Header = props => {
  const [burgerMenu, setBurgerMenu] = useState(false);

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
    </Container>
  );
};

export default Header;

const Container = styled.header`
  border-bottom: 2px solid var(--light-border-color-soft);
`;
