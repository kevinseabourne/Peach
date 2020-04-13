import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const ReusableContentLoader = props => {
  const {
    information,
    contentLoaded, // boolean value
    font,
    fontSize,
    margin,
    color,
    whiteSpace,
    backgroundColor, // this should be rgba
    transparentColor, // this should be rgba with opacity 0 - rgba(0, 0, 0, 0);
    linearGradient
  } = props;

  return (
    <Container>
      <Information
        information={information}
        contentLoaded={contentLoaded}
        font={font}
        fontSize={fontSize}
        margin={margin}
        color={color}
        whiteSpace={whiteSpace}
        backgroundColor={backgroundColor}
        transparentColor={transparentColor}
        linearGradient={linearGradient}
      >
        {information}
      </Information>
    </Container>
  );
};

ReusableContentLoader.propTypes = {
  information: PropTypes.string,
  contentLoaded: PropTypes.bool,
  font: PropTypes.string,
  fontSize: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string,
  whiteSpace: PropTypes.string,
  backgroundColor: PropTypes.string,
  transparentColor: PropTypes.string,
  linearGradient: PropTypes.string
};

const Container = styled.div`
  display: ${props => props.blockElement};
`;

const keyframesShimmer = keyframes`
0% {
   transform: translateX(-100%);
 }
 100% {
   transform: translateX(100%);
 }
`;

// ----- note  ----
// Make sure to use flexbox for the container and set align-items to get correct width of element.
// The width of this element is based on the container element, without flexbox used on the container the elements width will be the same as the container.

const Information = styled.div`
  font-family: ${props => props.font};
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin};
  color: ${props => props.backgroundColor};
  border-radius: 8px;
  background-color: ${props => props.backgroundColor};
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  white-space: ${props => props.whiteSpace};
  box-decoration-break: clone;
  &::before {
    content: "";
    position: absolute;
    vertical-align: middle;
    overflow: hidden;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    background: ${props =>
      props.contentLoaded ? "transparent" : props.linearGradient};
    animation: ${keyframesShimmer} 1s infinite ease-in-out;
  }

  ${props => !props.contentLoaded} {
    background-color: ${props => props.transparentColor};
    border-radius: 0px;
    color: ${props => props.color};
    &::before {
      filter: blur(0px);
      border-radius: 0px;
      background: transparent;
      animation: none;
    }
  }
`;

export default ReusableContentLoader;
