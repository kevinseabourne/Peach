import React from "react";
import styled from "styled-components";
import HeaderSearch from "./headerSearch";
import NavLinks from "./navLinks";
import peachIcon from "../images/peach.svg";
import { useHistory } from "react-router-dom";

const BottomHeader = props => {
  const history = useHistory();
  const { handleBurgerClick, burgerMenu } = props;

  const handleRouteChange = () => {
    history.push("/");
  };
  return (
    <BottomHeaderContainer>
      <Wrapper>
        <TitleLogoContainer
          data-testid="titleLogo"
          onClick={() => handleRouteChange()}
        >
          <WebsiteName>Peach</WebsiteName>
          <Logo peachIcon={peachIcon} />
        </TitleLogoContainer>
        <ResponsiveBurgerMenu
          value={burgerMenu}
          onClick={handleBurgerClick}
          id="ResponsiveBurgerMenu"
          data-testid="ResponsiveBurgerMenu"
        >
          <BurgerInner id="ResponsiveBurgerInner" burgerMenu={burgerMenu} />
        </ResponsiveBurgerMenu>
        <NavLinks />
        <SearchBurgerContainer>
          <HeaderSearch />
          <BurgerMenu
            value={burgerMenu}
            onClick={handleBurgerClick}
            id="burgerMenu"
            data-testid="burgerMenu"
          >
            <BurgerInner id="burgerInner" burgerMenu={burgerMenu} />
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
  @media (max-width: 935px) {
    height: 64px;
  }
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
  @media (max-width: 935px) {
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;

const WebsiteName = styled.h3`
  margin-right: 2px;
  font-size: var(--font-size-3xl);
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 935px) {
    font-size: var(--font-size-2xl);
  }
`;

const Logo = styled.div`
  width: 42px;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  transform: rotate(20deg);
  background-image: url(${props => props.peachIcon});
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 935px) {
    width: 32px;
  }
`;

const SearchBurgerContainer = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

const ResponsiveBurgerMenu = styled.div`
  display: none;
  position: relative;
  width: 16px;
  height: 12px;
  margin-left: auto;
  z-index: 40;
  margin-left: 32px;
  &:hover {
    cursor: pointer;
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
  @media (max-width: 935px) {
    display: inline-block;
  }
`;

const BurgerMenu = styled.div`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 12px;
  margin-left: auto;
  z-index: 40;
  margin-left: 32px;
  &:hover {
    cursor: pointer;
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
  @media (max-width: 935px) {
    display: none;
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
