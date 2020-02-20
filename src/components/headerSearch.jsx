import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "../images/search.svg";

const HeaderSearch = props => {
  const [toggleSearch, setToggleSearch] = useState(false);

  const handleSearchClick = () => {
    setToggleSearch(!toggleSearch);
  };
  return (
    <Search>
      <SearchIcon
        onClick={handleSearchClick}
        searchIcon={searchIcon}
        data-testid="SearchIcon"
      />
      <SearchOverlay toggleSearch={toggleSearch} data-testid="SearchOverlay">
        <ExitButton
          onClick={handleSearchClick}
          id="searchExitButton"
          data-testid="SearchExitButton"
        >
          <ExitInner />
        </ExitButton>
      </SearchOverlay>
    </Search>
  );
};

export default HeaderSearch;

const Search = styled.div``;

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

const SearchOverlay = styled.div`
  visibility: hidden;
  position: fixed;
  top: -9999;
  bottom: 0;
  left: -9999;
  right: 0;
  opacity: 0.95;
  overflow: hidden;
  transition: all 0.25s;
  opacity: 0;
  background-color: var(--color-black);
  ${props => !props.toggleSearch} {
    visibility: visible;
    top: 0;
    left: 0;
    opacity: 1;
  }
`;

const ExitButton = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 12px;
  margin-left: auto;
  padding: 24px;
  z-index: 4;
  &:hover {
    cursor: pointer;
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
  background-color: var(--main-background-color);
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
    background-color: var(--main-background-color);
    bottom: -10px;
    transform: translate3d(0, -10px, 0) rotate(-90deg);
  }
`;
