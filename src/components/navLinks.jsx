import React, { useState } from "react";
import styled from "styled-components";
import arrowIcon from "../images/arrow.svg";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const NavLinks = props => {
  const history = useHistory();
  const [closeDropDown, setCloseDropDown] = useState(false);
  const [links] = useState([
    {
      title: "Electronics",
      subLinks: [
        { title: "All Electronics", link: "/electronics" },
        { title: "VPNs", link: "/electronics/vpns" },
        { title: "Routers", link: "/electronics/routers" },
        { title: "Laptops", link: "/electronics/laptops" },
        { title: "Gaming", link: "/electronics/gaming" },
        { title: "Monitors", link: "/electronics/monitors" },
        { title: "Phone Chargers", link: "/electronics/phone-chargers" },
        { title: "Headphones", link: "/electronics/headphones" },
        {
          title: "Bluetooth Speakers",
          link: "/electronics/bluetooth-speakers"
        },
        { title: "Smart Watches", link: "/electronics/smart-watches" },
        { title: "TVs", link: "/electronics/tvs" },
        { title: "Drones", link: "/electronics/drones" },
        { title: "Projectors", link: "/electronics/projectors" }
      ],
      dropdownOpen: false
    },
    {
      title: "Home",
      subLinks: [
        { title: "All Home", link: "/home" },
        { title: "Bedroom", link: "/home/bedroom" },
        { title: "Bathroom", link: "/home/bathroom" },
        { title: "Cleaning", link: "/home/cleaning" },
        { title: "Kitchen", link: "/home/kitchen" },
        { title: "Lighting", link: "/home/lighting" }
      ],
      dropdownOpen: false
    },
    {
      title: "Health & Fitness",
      subLinks: [{ title: "All Health & Fitness", link: "/health-fitness" }],
      dropdownOpen: false
    }
  ]);

  const handleLinkRoute = subLink => {
    history.push(subLink.link, {
      subLink: subLink.title
    });
    if (history.location.pathname === subLink.link) {
      handleDropDownClosure(true);
    }
  };

  const handleDropDownClosure = BooleanValue => {
    setCloseDropDown(BooleanValue);
  };

  return (
    <LinksContainer>
      {links.map(link => (
        <Links key={links.indexOf(link)} data-testid="navLinks">
          <Link
            onMouseOver={() => handleDropDownClosure(false)}
            data-testid={`navLink${link.title}`}
            name={link.title}
            key={links.indexOf(link)}
            icon={arrowIcon}
          >
            {link.title}
          </Link>
          <DropdownContainer
            closeDropDown={closeDropDown}
            data-testid={`sideBar${link.title}Dropdown`}
          >
            {link.subLinks.map(subLink => (
              <SubLinks
                data-testid={`subLink${subLink.title}`}
                key={link.subLinks.indexOf(subLink)}
                onClick={() => handleLinkRoute(subLink)}
              >
                {subLink.title}
              </SubLinks>
            ))}
          </DropdownContainer>
        </Links>
      ))}
    </LinksContainer>
  );
};

export default NavLinks;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 220px;
`;

const Links = styled.div``;

const DropdownContainer = styled.div`
  width: 192px;
  height: auto;
  position: absolute;
  background-color: var(--bg-color-dropdown);
  margin-top: 40px;
  z-index: 1;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
  max-height: 800px;
  padding: 16px 0px;
  visibility: hidden;
  opacity: 0.95;
  overflow: hidden;
  &:hover {
    visibility: visible;
  }
  ${props => !props.closeDropDown} {
    visibility: hidden;
    display: none;
  }
`;

const Link = styled.span`
  color: var(--light-text-color-strong);
  font-weight: 600;
  font-style: normal;
  background-size: 4px;
  padding: 40px 20.8px;
  width: 100%;
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
  &:hover + ${DropdownContainer} {
    visibility: visible;
  }
  @media (max-width: 935px) {
    display: none;
  }
`;

const SubLinks = styled.div`
  color: var(--dark-text-color-strong);
  font-size: var(--font-size-sm);
  width: 192px;
  box-sizing: border-box;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    color: var(--color-accent);
  }
`;
