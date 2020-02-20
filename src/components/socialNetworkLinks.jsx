import React from "react";
import styled from "styled-components";
import facebookIcon from "../images/facebook.svg";
import twitterIcon from "../images/twitter.svg";
import instagramIcon from "../images/instagram.svg";
import pinterestIcon from "../images/pinterest.svg";

const SocialNetworkLinks = props => {
  const { sideBar } = props;
  const socialNetworkIcons = [
    { link: "https://www.facebook.com/", icon: facebookIcon },
    { link: "https://twitter.com/", icon: twitterIcon },
    { link: "https://www.instagram.com/", icon: instagramIcon },
    { link: "https://www.pinterest.com/", icon: pinterestIcon }
  ];
  return (
    <SocialNetworks sideBar={sideBar}>
      {socialNetworkIcons.map(obj => (
        <Icon
          key={socialNetworkIcons.indexOf(obj)}
          href={obj.link}
          target="_blank"
          icon={obj.icon}
        />
      ))}
    </SocialNetworks>
  );
};

export default SocialNetworkLinks;

const SocialNetworks = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  ${props => !props.sideBar} {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
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
