import React from "react";
import styled from "styled-components";
import facebookIcon from "../images/facebook.svg";
import twitterIcon from "../images/twitter.svg";
import instagramIcon from "../images/instagram.svg";
import pinterestIcon from "../images/pinterest.svg";

const TopHeader = props => {
  const links = ["Home", "About", "Contact"];
  const socialNetworkIcons = [
    { link: "https://www.facebook.com/", icon: facebookIcon },
    { link: "https://twitter.com/", icon: twitterIcon },
    { link: "https://www.instagram.com/", icon: instagramIcon },
    { link: "https://www.pinterest.com/", icon: pinterestIcon }
  ];
  return (
    <TopHeaderContainer>
      <Wrapper>
        <TopNavLinks>
          {links.map(link => (
            <Link key={links.indexOf(link)}>{link}</Link>
          ))}
        </TopNavLinks>
        <SocialNetworks>
          {socialNetworkIcons.map(obj => (
            <Icon
              key={socialNetworkIcons.indexOf(obj)}
              href={obj.link}
              target="_blank"
              icon={obj.icon}
            />
          ))}
        </SocialNetworks>
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

const SocialNetworks = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Icon = styled.a`
  width: 15px;
  height: 15px;
  margin: auto 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${props => props.icon});
  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    cursor: pointer;
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
`;
