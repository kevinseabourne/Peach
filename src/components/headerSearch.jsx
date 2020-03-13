import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import searchIcon from "../images/search.svg";
import crossIcon from "../images/cross-icon.svg";

const HeaderSearch = props => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (toggleSearch) {
      ref.current.focus();
    }
  }, [toggleSearch]);

  const handleSearchClick = () => {
    setToggleSearch(!toggleSearch);
  };

  const handleSearchQuery = value => {
    setSearchQuery(value);
  };

  const clearInputOnClick = () => {
    // decided to use my own clear element in the iput as
    // there is not support for the html clear element in firefox.
    setSearchQuery("");
    // after clearing the input put the input back into focus.
    ref.current.focus();
  };

  return (
    <Search>
      <SearchIcon
        onClick={handleSearchClick}
        searchIcon={searchIcon}
        data-testid="SearchIcon"
      />
      <TransitionGroup component={null}>
        {toggleSearch && (
          <CSSTransition
            in={toggleSearch}
            classNames="searchOverlay"
            timeout={250}
          >
            <SearchOverlay data-testid="SearchOverlay">
              <ExitButton
                onClick={handleSearchClick}
                id="searchExitButton"
                data-testid="SearchExitButton"
              >
                <ExitInner />
              </ExitButton>
              <OuterContainer>
                <SearchBarContainer>
                  <Input
                    ref={ref}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => handleSearchQuery(e.currentTarget.value)}
                  />
                  <IconBox
                    image={crossIcon}
                    onClick={clearInputOnClick}
                    value={searchQuery.length >= 1}
                    data-testid="searchQueryIconBox"
                  />
                </SearchBarContainer>
                <SearchMessage>
                  Hit enter to search or ESC to close.
                </SearchMessage>
              </OuterContainer>
            </SearchOverlay>
          </CSSTransition>
        )}
      </TransitionGroup>
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  transition: all 0.25s;
  opacity: 0.95;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  background-color: var(--color-black);
  &.searchOverlay-enter {
    opacity: 0;
    transition: all 0.25s;
  }
  &.searchOverlay-enter-active {
    opacity: 0.95;
    transition: all 0.25s;
  }
  &.searchOverlay-exit {
    transition: all 0.25s;
    opacity: 0.95;
  }
  &.searchOverlay-exit-active {
    opacity: 0;
    transition: all 0.25s;
  }
`;

const SearchBarContainer = styled.div`
  border-bottom: 3px solid var(--main-background-color);
  background-color: transparent;
  height: 64px;
  width: 704px;
  margin-top: 6.2px;
  margin-bottom: 10px;
  outline: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;
  &:focus {
    border-color: var(--color-accent);
    transition: all 0.3s ease-in-out;
  }
  &:focus-within {
    font-weight: 500;
    font-size: 14px;
    color: rgb(51, 51, 51);
    border-color: var(--color-accent);
    outline: none;
    transition: all 0.3s ease-in-out;
  }
`;

const Input = styled.input`
  padding: "14.5px 40px 0px 12px";
  border: none;
  transition: all 0.25s;
  box-sizing: border-box;
  background-color: transparent;
  outline: none;
  cursor: text;
  height: 100%;
  width: 94%;
  min-height: 42px;
  font-size: 24px;
  font-weight: 500;
  color: var(--main-background-color);
`;

const IconBox = styled.div`
  width: 44px;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0px;
  margin: auto;
  position: absolute;
  fill: var(--color-accent) !important;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: transparent;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 31%;
  transition: all 0.25s;
  opacity: 0;
  transform: scale(0);
  &:hover {
    cursor: pointer;
  }
  ${props => !props.value} {
    opacity: 1;
    transform: scale(1);
  }
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchMessage = styled.span`
  font-size: 13px;
  color: var(--main-background-color);
  display: flex;
  align-self: flex-end;
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
