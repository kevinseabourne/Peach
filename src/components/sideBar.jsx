import React from "react";
import styled from "styled-components";
import peachIcon from "../images/peach.svg";
import NewsLetter from "./newsletter";

const SideBar = React.forwardRef((props, ref) => {
  const { burgerMenu, handleBurgerClick } = props;
  return (
    <Container burgerMenu={burgerMenu} ref={ref} data-testid="sideBar">
      <TopSection>
        <TitleLogoContainer>
          <WebsiteName>Peach</WebsiteName>
          <Logo peachIcon={peachIcon} />
        </TitleLogoContainer>
        <ExitButton
          value={burgerMenu}
          onClick={handleBurgerClick}
          id="ExitButton"
          data-testid="ExitButton"
        >
          <ExitInner burgerMenu={burgerMenu} />
        </ExitButton>
      </TopSection>
      <NewsLetter />
    </Container>
  );
});

export default SideBar;

const Container = styled.div`
  height: 100vh;
  width: 350px;
  position: fixed;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  top: 0;
  bottom: 0;
  left: 0;
  visibility: hidden;
  z-index: 200;
  transition: all 0.2s ease;
  background-color: var(--color-white);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
  ${props => !props.burgerMenu} {
    visibility: visible;
    transform: translateX(0%);
  }
`;

const TopSection = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
  border-bottom: 2px solid var(--light-border-color-soft);
`;

const TitleLogoContainer = styled.div`
  height: 100%;
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

const ExitButton = styled.div`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 12px;
  margin-left: auto;
  z-index: 4;
  &:hover {
    cursor: pointer;
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
`;

const ExitInner = styled.div`
  position: absolute;
  width: 16px;
  height: 2px;
  transition-timing-function: ease;
  transition-duration: 0.15s;
  transition-property: transform;
  border-radius: 4px;
  background-color: var(--light-text-color-strong);
  transform: translate3d(0, 5px, 0) rotate(45deg);
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
    transform: translate3d(0, -10px, 0) rotate(-90deg);
  }
`;
