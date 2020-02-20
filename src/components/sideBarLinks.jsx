import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import biggerArrowIcon from "../images/biggerArrowIcon.svg";

const SideBarLinks = props => {
  const [links, setLinks] = useState([
    {
      title: "Electronics",
      subLinks: [
        { title: "All Electronics", address: "/electronics" },
        { title: "VPNs", link: "/electronics/vpns" },
        { title: "Routers", link: "electronics/routers" },
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
      subLinks: [{ title: "All Home & Fitness", link: "/heath-fitness" }],
      dropdownOpen: false
    }
  ]);

  const handleDropdown = link => {
    const linksClone = _.cloneDeep(links);
    const UpdatedLinks = linksClone.map(linkClone => {
      if (linkClone.title === link.title && !linkClone.dropdownOpen) {
        linkClone.dropdownOpen = true;
        return linkClone;
      } else if (linkClone.title !== link.title && linkClone.dropdownOpen) {
        return linkClone;
      } else {
        linkClone.dropdownOpen = false;
        return linkClone;
      }
    });
    setLinks(UpdatedLinks);
  };

  return (
    <Container>
      {links.map(link => (
        <Links key={links.indexOf(link)}>
          <Link
            key={links.indexOf(link)}
            icon={biggerArrowIcon}
            onClick={() => handleDropdown(link)}
            dropdownOpen={link.dropdownOpen}
          >
            {link.title}
          </Link>
          <DropdownContainer
            dropdownOpen={link.dropdownOpen}
            data-testid={`sideBar${link.title}Dropdown`}
          >
            {link.subLinks.map(subLink => (
              <SubLinks key={link.subLinks.indexOf(subLink)}>
                {subLink.title}
              </SubLinks>
            ))}
          </DropdownContainer>
        </Links>
      ))}
    </Container>
  );
};

export default SideBarLinks;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Links = styled.div`
  margin-right: auto;
  width: 100%;
  margin-left: 0px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Link = styled.div`
  color: var(--light-text-color-strong);
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  margin-left: auto;
  padding: 1.3rem;
  font-weight: 600;
  font-style: normal;
  background-size: 4px;
  position: relative;
  width: 100%;
  transition: 0.25s transform;
  transition: 0.25s background-color;
  filter: none;
  border-left: 4px solid var(--main-background-color);
  ${props => !props.dropdownOpen} {
    filter: none !important;
    background-color: var(--bg-color-alt);
    border-left: 4px solid var(--color-accent);
    color: var(--color-accent);
  }
  &:hover {
    cursor: pointer;
    color: var(--color-accent);
    border-color: var(--color-accent);
    filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
      brightness(93%) contrast(88%);
  }
  &::after {
    margin: 0 auto;
    margin-left: 8.8px;
    content: url(${props => props.icon});
    left: 87%;
    margin-left: 0;
    position: absolute;
    transform: rotate(0deg);
    transition: all 0.25s;
    ${props => !props.dropdownOpen} {
      transform: rotate(-180deg);
      filter: invert(53%) sepia(92%) saturate(1423%) hue-rotate(183deg)
        brightness(93%) contrast(88%);
    }
  }
`;

const DropdownContainer = styled.div`
  width: 100%;
  height: auto;
  max-height: 0;
  visibility: hidden;
  transition: all 0.3s;
  overflow: hidden;
  ${props => !props.dropdownOpen} {
    visibility: visible;
    max-height: 800px;
  }
`;

const SubLinks = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 1.3rem;
  padding-left: 2.3rem;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    color: var(--color-accent);
  }
`;
