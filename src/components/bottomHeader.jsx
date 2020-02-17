import React from "react";
import styled from "styled-components";
import NavLinks from "./navLinks";
import peachIcon from "../images/peach.svg";
import searchIcon from "../images/search.svg";

const BottomHeader = props => {
  const { handleBurgerClick, burgerMenu } = props;
  return (
    <BottomHeaderContainer>
      <Wrapper>
        <TitleLogoContainer>
          <WebsiteName>Peach</WebsiteName>
          <Logo peachIcon={peachIcon} />
        </TitleLogoContainer>
        <NavLinks />
        <SearchBurgerContainer>
          <SearchIcon searchIcon={searchIcon} />
          <BurgerMenu
            value={burgerMenu}
            onClick={handleBurgerClick}
            id="burgerMenu"
            data-testid="burgerMenu"
          >
            <BurgerInner burgerMenu={burgerMenu} />
          </BurgerMenu>
        </SearchBurgerContainer>
      </Wrapper>
    </BottomHeaderContainer>
  );
};

export default BottomHeader;

const BottomHeaderContainer = styled.div`
  height: 96px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1300px;
  margin: 0 30px;
  display: flex;
  align-items: center;
`;

const TitleLogoContainer = styled.div`
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WebsiteName = styled.h3`
  margin-right: 2px;
  font-size: var(--font-size-3xl);
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.div`
  width: 50px;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  transform: rotate(20deg);
  background-image: url(${props => props.peachIcon});
  &:hover {
    cursor: pointer;
  }
`;

const SearchBurgerContainer = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled.div`
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${props => props.searchIcon});
  &:hover {
    cursor: pointer;
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
`;

const BurgerMenu = styled.div`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 12px;
  margin-left: auto;
  z-index: 4;
  margin-left: 32px;
  &:hover {
    cursor: pointer;
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
`;

const BurgerInner = styled.div`
  position: absolute;
  width: 16px;
  height: 2px;
  transition-timing-function: ease;
  transition-duration: 0.15s;
  transition-property: transform;
  border-radius: 4px;
  background-color: var(--light-text-color-strong);
  ${props => !props.burgerMenu} {
    transform: translate3d(0, 5px, 0) rotate(45deg);
  }
  &::before {
    display: block;
    content: "";
    top: 5px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform, opacity;
    position: absolute;
    width: 16px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: var(--light-text-color-strong);
    ${props => !props.burgerMenu} {
      opacity: 0;
    }
  }
  &::after {
    top: 10px;
    display: block;
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: var(--light-text-color-strong);
    bottom: -10px;
    ${props => !props.burgerMenu} {
      transform: translate3d(0, -10px, 0) rotate(-90deg);
    }
  }
`;
