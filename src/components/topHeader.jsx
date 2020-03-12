import React from "react";
import styled from "styled-components";
import SocialNetworkLinks from "./socialNetworkLinks";
import { useHistory } from "react-router-dom";

const TopHeader = props => {
  const history = useHistory();
  const links = ["home", "about", "contact"];

  const handleRouteChange = link => {
    if (link === "home") {
      history.push("/");
    } else {
      history.push(`/${link}`);
    }
  };

  return (
    <TopHeaderContainer>
      <Wrapper>
        <TopNavLinks>
          {links.map(link => (
            <Link
              onClick={() => handleRouteChange(link)}
              key={links.indexOf(link)}
            >
              {link}
            </Link>
          ))}
        </TopNavLinks>
        <SocialNetworkLinks sideBar={false} />
      </Wrapper>
    </TopHeaderContainer>
  );
};

export default TopHeader;

const TopHeaderContainer = styled.div`
  height: 56px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 935px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1300px;
  margin: 0 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TopNavLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Link = styled.span`
  font-size: var(--font-size-xs);
  color: var(--light-text-color-strong);
  font-weight: bold;
  margin: 0 16px;
  text-transform: uppercase;
  &:first-child {
    margin-left: 0px;
  }
  &:hover {
    cursor: pointer;
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
`;
