import React from "react";
import styled from "styled-components";
import arrowIcon from "../images/arrow.svg";
import biggerArrowIcon from "../images/biggerArrowIcon.svg";

const NavLinks = props => {
  const links = ["Electronics", "Home", "Heath & Fitness"];
  return (
    <Links data-testid="navLinks">
      {links.map(link => (
        <Link key={links.indexOf(link)} icon={arrowIcon}>
          {link}
        </Link>
      ))}
    </Links>
  );
};

export default NavLinks;

const Links = styled.div`
  margin-left: 220px;
  margin-right: auto;
`;

const Link = styled.span`
  color: var(--light-text-color-strong);
  font-weight: 600;
  font-style: normal;
  margin: 1.3rem;
  background-size: 4px;
  width: 100%;
  transition: 0.2s all ease;
  &::after {
    margin: 0 auto;
    margin-left: 8.8px;
    content: url(${props => props.icon});
  }
  &:hover {
    cursor: pointer;
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
  @media (max-width: 935px) {
    display: none;
  }
`;
