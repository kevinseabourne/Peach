import React from "react";
import styled, { keyframes } from "styled-components";
import ReusableContentLoader from "./common/ReusableContentLoader";

const Loading = props => {
  return (
    <LoadingContainer data-testid="loading">
      <LeftContent>
        <Featured>
          <FeaturedBox />
          <Line />
          <ReusableContentLoader
            // Featured Title
            information={"Featured"}
            width={"14px"}
            font={"inherit"}
            fontSize={`inherit`}
            margin={"6px 0px 6px 0px"}
            color={"var(--color-white)"}
            backgroundColor={"rgba(232, 232, 232, 1)"}
            transparentColor={"rgba(232, 232, 232, 0)"}
            linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
          />
        </Featured>
        <ArticleInformation>
          <ReusableContentLoader
            // Category
            width={"14px"}
            font={"var(--font-size-xs)"}
            fontSize={`var(--font-size-xs)`}
            letterSpacing={"0.2px"}
            margin={"0px 0px 6px 0px"}
            color={"var(--color-white)"}
            backgroundColor={"rgba(232, 232, 232, 1)"}
            transparentColor={"rgba(232, 232, 232, 0)"}
            linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
          />
          <ReusableContentLoader
            // Title
            width={"28px"}
            font={"inherit"}
            fontSize={"24px"}
            margin={"8px 0px 15px 0px"}
            color={"var(--color-white)"}
            backgroundColor={"rgba(232, 232, 232, 1)"}
            transparentColor={"rgba(232, 232, 232, 0)"}
            linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
          />
          <AuthorDateContainer>
            <ReusableContentLoader
              // Author
              information={`By Kevin Seabourne`}
              font={"inherit"}
              fontSize={"inherit"}
              margin={"0px 0px"}
              color={"var(--color-white)"}
              backgroundColor={"rgba(232, 232, 232, 1)"}
              transparentColor={"rgba(232, 232, 232, 0)"}
              linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
            />
            <Dot />
            <ReusableContentLoader
              // Published / Updated Article Date
              width={"24px"}
              font={"inherit"}
              fontSize={"inherit"}
              margin={"0rem 0rem"}
              color={"var(--color-white)"}
              backgroundColor={"rgba(232, 232, 232, 1)"}
              transparentColor={"rgba(232, 232, 232, 0)"}
              linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
            />
          </AuthorDateContainer>
        </ArticleInformation>
      </LeftContent>
      <RightContent></RightContent>
    </LoadingContainer>
  );
};

export default Loading;

const keyframesShimmer = keyframes`
0% {
   transform: translateX(-100%);
 }
 100% {
  transform: translateX(100%);
 }
`;

const LoadingContainer = styled.div`
  height: 653px;
  width: 100%;
  background: #ddd;
  overflow: hidden;
  opacity: 1;
  transition: all 0.7s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(10px);
    background: linear-gradient(to right, #ddd 4%, #e8e8e8 18%, #ddd 36%);
    ${"" /* animation: ${keyframesShimmer} 1s infinite ease-in-out; */}
  }
  @media (max-width: 935px) {
    height: 100vh;
  }
`;

const LeftContent = styled.div`
  height: 540px;
  margin-left: 50px;
  display: flex;
  z-index: 10;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 935px) {
    height: 80vh;
  }
`;

const Featured = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FeaturedBox = styled.div`
  transition: 0.3s, background-color 0.4s ease;
  background-color: rgba(232, 232, 232, 1);
  color: var(--color-white);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    vertical-align: middle;
    overflow: hidden;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    background: linear-gradient(
      to right,
      rgba(232, 232, 232, 1) 4%,
      #ddd 28%,
      rgba(232, 232, 232, 1) 36%
    );
    animation: ${keyframesShimmer} 1s infinite ease-in-out;
  }
`;

const Line = styled.div`
  color: var(--color-white);
  margin: 0rem 0.5rem;
  vertical-align: middle;
  display: inline-flex;
  align-self: center;
  background-color: currentColor;
  height: 0.15rem;
  width: 1rem;
  opacity: 0.5;
`;

const ArticleInformation = styled.div`
  color: var(--color-white);
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const AuthorDateContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Dot = styled.div`
  color: #e8e8e8;
  background-color: #e8e8e8;
  border-radius: 15px;
  display: inline-flex;
  align-self: center;
  overflow: hidden;
  height: 0.25rem;
  width: 0.25rem;
  margin: 0rem 0.5rem;
  opacity: 0.5;
`;

const RightContent = styled.div`
  box-sizing: border-box;
  width: 357.3px;
  background-color: #d8d8d8;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 32px;
  z-index: 10;
  margin-right: 50px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  ${props => !props.imageLoaded} {
    background-color: rgba(0, 0, 0, 0.6);
  }
  @media (max-width: 935px) {
    display: none;
  }
`;
