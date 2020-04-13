import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import LazyLoad from "react-lazyload";
import _ from "lodash";
import { getAllArticles } from "../components/services/articleService";
import ReusableContentLoader from "./common/ReusableContentLoader";

const FeaturedSection = props => {
  const ref = useRef(null);
  const [mouseDownPosition, setMouseDownPosition] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [fadeIn, setFadeIn] = useState(null);
  const [fadeOut, setFadeOut] = useState(1);
  const [translateYIn, setTranslateYIn] = useState(19);
  const [translateYOut, setTranslateYOut] = useState(null);
  const [dragAnimation, setDragAnimation] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [allArticles, setAllArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const timer = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getAllArticles();

      setAllArticles(data);
      handleFeaturedArticles(data);
    }
    fetchData();
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  const handleFeaturedArticles = articles => {
    // In the admin page, give the ability to set which articles are featured articles max 4 articles.
    const featuredArticles = articles.filter(
      article => article.featuredArticle
    );
    // giving each article an animation direction
    featuredArticles.map(article => {
      if (featuredArticles.indexOf(article) === 0) {
        article.animationDirection = "left";
        article.selected = true;
        return article;
      } else {
        article.animationDirection = "right";
        article.selected = false;
        return article;
      }
    });
    setFeaturedArticles(featuredArticles);
  };

  const handleFeaturedArticleChange = SelectedArticle => {
    const featuredArticlesClone = _.clone(featuredArticles);
    const currentArticleIndex = featuredArticlesClone.findIndex(
      article => article.selected
    );
    const selectedArticleIndex = featuredArticlesClone.indexOf(SelectedArticle);

    const updatedFeaturedArticles = featuredArticlesClone.map(article => {
      if (SelectedArticle.id === article.id) {
        article.selected = true;
        if (selectedArticleIndex > currentArticleIndex) {
          article.animationDirection = "right";
        } else {
          article.animationDirection = "left";
        }
        return article;
      } else {
        article.selected = false;
        return article;
      }
    });
    setFeaturedArticles(updatedFeaturedArticles);
  };

  const onImageLoad = () => {
    const featuredArticlesClone = _.clone(featuredArticles);

    timer.current = setTimeout(() => {
      const updatedFeaturedArticles = featuredArticlesClone.map(article => {
        article.imageLoaded = true;
        return article;
      });
      setFeaturedArticles(updatedFeaturedArticles);
    }, 2800);
  };

  const handleArticleSwipeChange = swipe => {
    const featuredArticlesClone = _.clone(featuredArticles);
    let selectedArticleIndex = featuredArticlesClone.find(
      article => article.selected === true
    );
    // if selected article is the last in the carousel then go to the start
    // and if selected is first in the carousel go to the next one
    let index;
    if (
      featuredArticlesClone.length - 1 ===
      featuredArticlesClone.indexOf(selectedArticleIndex)
    ) {
      index = "reset";
    } else if (featuredArticlesClone.indexOf(selectedArticleIndex) === 0) {
      index = 0;
    } else {
      index = featuredArticlesClone.indexOf(selectedArticleIndex);
    }

    if (swipe === "right") {
      const nextIndex = index !== "reset" ? index + 1 : 0;
      const article = featuredArticles[nextIndex];
      handleFeaturedArticleChange(article);
    } else {
      const nextIndex =
        index !== "reset" ? (index === 0 ? index + 1 : index - 1) : 0;
      const article = featuredArticles[nextIndex];
      handleFeaturedArticleChange(article);
    }
  };

  const handleSwipeLengthThreshold = e => {
    const containerWidth = (50 * ref.current.offsetWidth) / 100;
    // the article will go to the next article if you have dragged the mouse 25% or more and release the click.
    let swipeThreshold = (25 * containerWidth) / 100;

    let mouseUpPosition = e.pageX - ref.current.offsetLeft;
    let swipeLength =
      swipeDirection === "right"
        ? mouseUpPosition - mouseDownPosition
        : mouseDownPosition - mouseUpPosition;

    // if we meet the correct length then we go to the next article.
    if (swipeLength >= swipeThreshold) {
      if (swipeDirection === "right") {
        handleArticleSwipeChange("right");
      } else {
        handleArticleSwipeChange("left");
      }
    }
  };

  const handleMouseDown = e => {
    let position = e.pageX - ref.current.offsetLeft;
    setMouseDownPosition(position);
    setMouseDown(true);
  };

  let handleDragging = e => {
    setDragAnimation(true);
    // swipe direction
    e.movementX > 0 ? setSwipeDirection("right") : setSwipeDirection("left");

    // used ref.current.offsetLeft & ref.current.offsetWidth instead of e.target.offsetLeft & e.target.offsetWidth due e.target changing when hovering over children in container.
    const mouseDragPosition = e.pageX - ref.current.offsetLeft;

    // dragging the mouse 50% left or right of the element will complete the animation.
    const containerWidth = (50 * ref.current.offsetWidth) / 100;
    const percentage = _.round(
      100 * ((mouseDragPosition - mouseDownPosition) / containerWidth)
    );

    if (percentage <= 100 && percentage >= -100) {
      const oppositePercentage =
        swipeDirection === "left"
          ? 100 - Math.abs(percentage)
          : 100 - percentage;

      // dynamic animations based on mouse position
      let opacityIn =
        swipeDirection === "left"
          ? (Math.abs(percentage) * 1) / 100
          : (percentage * 1) / 100;
      let opacityOut =
        swipeDirection === "left"
          ? (Math.abs(oppositePercentage) * 1) / 100
          : (oppositePercentage * 1) / 100;
      let translateIn =
        swipeDirection === "left"
          ? (Math.abs(oppositePercentage) * 19) / 100
          : (oppositePercentage * 19) / 100;
      let translateOut =
        swipeDirection === "left"
          ? (Math.abs(percentage) * 19) / 100
          : (percentage * 19) / 100;

      setFadeOut(opacityOut);
      setFadeIn(opacityIn);
      setTranslateYOut(translateOut);
      setTranslateYIn(translateIn);
    }
  };

  const handleMouseUp = e => {
    handleSwipeLengthThreshold(e);
    setMouseDown(false);
    setDragAnimation(false);
    setFadeIn(null);
    setFadeOut(1);
    setTranslateYIn(19);
    setTranslateYOut(null);
  };

  const handleMouseOut = e => {
    handleSwipeLengthThreshold(e);
    setMouseDown(false);
    setDragAnimation(false);
    setFadeIn(null);
    setFadeOut(1);
    setTranslateYIn(19);
    setTranslateYOut(null);
  };

  return (
    <Container
      ref={ref}
      onMouseDown={e => handleMouseDown(e)}
      onMouseMove={e => mouseDown && handleDragging(e)}
      onMouseUp={e => handleMouseUp(e)}
      onMouseLeave={e => mouseDown && handleMouseOut(e)}
      data-testid="carousel-container"
    >
      {featuredArticles.map(article => (
        <InnerContainer key={article.id}>
          <LazyLoad key={article.id} once={true} height={653} offset={100}>
            <BackgroundImage
              key={article.id}
              image={article.image[1]}
              loadImage={`${article.image[0]}&w=1302`}
              imageLoaded={article.imageLoaded}
              articleSelected={article.selected}
              animationDirection={article.animationDirection}
              dragAnimation={mouseDown}
              fadeIn={fadeIn}
              fadeOut={fadeOut}
              data-testid={`${article.title} background-image`}
            >
              <PlaceHolder imageLoaded={article.imageLoaded}>
                <Internal />
              </PlaceHolder>
            </BackgroundImage>
            <ImageLoader
              src={article.image[1]}
              onLoad={() => onImageLoad(article, featuredArticles)}
            />
          </LazyLoad>
          <LeftContent>
            <Featured>
              <FeaturedBox imageLoaded={article.imageLoaded}>
                <ArticleNumber
                  key={article.id}
                  index={featuredArticles.indexOf(article) + 1}
                  articleSelected={article.selected}
                  animationDirection={article.animationDirection}
                  data-testid={`${article.title} article-number`}
                  imageLoaded={article.imageLoaded}
                >
                  {article.imageLoaded && featuredArticles.indexOf(article) + 1}
                </ArticleNumber>
              </FeaturedBox>

              <Line />
              <ReusableContentLoader
                // Featured Title
                information={"Featured"}
                width={"14px"}
                contentLoaded={article.imageLoaded}
                font={"inherit"}
                fontSize={`inherit`}
                margin={"6px 0px 6px 0px"}
                color={"var(--color-white)"}
                backgroundColor={"rgba(232, 232, 232, 1)"}
                transparentColor={"rgba(232, 232, 232, 0)"}
                linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
              />
            </Featured>
            <ArticleInformation
              image={article.image[1]}
              articleSelected={article.selected}
              key={article.id}
              dragAnimation={dragAnimation}
              fadeIn={fadeIn}
              fadeOut={fadeOut}
              translateYOut={translateYOut}
              translateYIn={translateYIn}
              data-testid={`${article.title} Container`}
            >
              <ReusableContentLoader
                // Category
                information={article.category}
                width={"14px"}
                contentLoaded={article.imageLoaded}
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
                information={article.title}
                width={"28px"}
                contentLoaded={article.imageLoaded}
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
                  information={`By ${article.author}`}
                  contentLoaded={article.imageLoaded}
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
                  information={`By ${new Date().toDateString(
                    article.datePublished
                  )}`}
                  contentLoaded={article.imageLoaded}
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
            <SwiperPaginationContainer>
              {featuredArticles.map(fpArticle => (
                <SwiperPagination
                  key={fpArticle.id}
                  data-testid={`${fpArticle.title}pagination-dot`}
                  articleSelected={fpArticle.selected}
                  onClick={() => handleFeaturedArticleChange(fpArticle)}
                />
              ))}
            </SwiperPaginationContainer>
          </LeftContent>
          <RightContent imageLoaded={article.imageLoaded}>
            <SidebarTitleContainer>
              <ReusableContentLoader
                // Sidebar Title
                information={"What's Hot"}
                contentLoaded={article.imageLoaded}
                font={"inherit"}
                fontSize={`var(--font-size-xl)`}
                margin={"0px auto 24px 0px"}
                color={"var(--color-white)"}
                backgroundColor={"rgba(232, 232, 232, 1)"}
                transparentColor={"rgba(232, 232, 232, 0)"}
                linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
              />
            </SidebarTitleContainer>
            {featuredArticles.map(article => (
              <SideBarArticleContainer key={featuredArticles.indexOf(article)}>
                <SideBarArticleImage imageLoaded={article.imageLoaded} />
                <SideBarArticleInfoContainer>
                  <ReusableContentLoader
                    // Title
                    information={article.title}
                    contentLoaded={article.imageLoaded}
                    font={"inherit"}
                    fontSize={"24px"}
                    margin={"0px 0px 0px 0px"}
                    color={"var(--color-white)"}
                    backgroundColor={"rgba(232, 232, 232, 1)"}
                    transparentColor={"rgba(232, 232, 232, 0)"}
                    linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
                  />
                  <ReusableContentLoader
                    // Published / Updated Article Date
                    information={`By ${new Date().toDateString(
                      article.datePublished
                    )}`}
                    contentLoaded={article.imageLoaded}
                    font={"inherit"}
                    fontSize={"15px"}
                    margin={"0px auto auto 0px"}
                    whiteSpace={"nowrap"}
                    color={"var(--color-white)"}
                    backgroundColor={"rgba(232, 232, 232, 1)"}
                    transparentColor={"rgba(232, 232, 232, 0)"}
                    linearGradient={`linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%)`}
                  />
                </SideBarArticleInfoContainer>
              </SideBarArticleContainer>
            ))}
          </RightContent>
        </InnerContainer>
      ))}
    </Container>
  );
};

export default FeaturedSection;

const Container = styled.div`
  height: 653px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  @media (max-width: 935px) {
    height: 100vh;
  }
`;

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  overflow: hidden;
  @media (max-width: 935px) {
    height: 100vh;
  }
`;

const keyframesShimmer = keyframes`
0% {
   transform: translateX(-100%);
 }
 100% {
  transform: translateX(100%);
 }
`;

const PlaceHolder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #ddd;
  z-index: -99;
  opacity: 1;
  transition: all 0.7s ease-in-out;
  position: relative;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(10px);
    background: linear-gradient(to right, #ddd 4%, #e8e8e8 18%, #ddd 36%);
    animation: ${keyframesShimmer} 1s infinite ease-in-out;
  }
  ${props => !props.imageLoaded} {
    background: transparent;
    opacity: 0;
    &::after {
      background: transparent;
      animation: none !important;
    }
  }
`;

const Internal = styled.div`
  z-index: -99;
`;

const BackgroundImage = styled.div.attrs(props => ({
  style: {
    opacity: props.articleSelected
      ? !props.dragAnimation
        ? 1
        : props.fadeOut
      : !props.dragAnimation
      ? 0
      : props.fadeIn
  }
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  transition: all 1.9s linear;
  background: url(${props => props.image});
  background-position: center;
  z-index: -999;
  background-size: cover;
  background-repeat: no-repeat;
  ${props => props.articleSelected} {
    opacity: 0;
    transition: all 0.7s;
  }
  ${props => !props.articleSelected} {
    opacity: 1;
    transition: all 0.7s;
  }
  ${props => !props.imageLoaded} {
    filter: blur(0px);
    animation: none;
  }
`;

const ImageLoader = styled.img`
  display: none;
`;

const LeftContent = styled.div`
  height: 540px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 935px) {
    height: 80vh;
  }
`;

const Featured = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FeaturedBox = styled.div`
  transition: 0.3s, background-color 0.3s ease-in-out;
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
  ${props => !props.imageLoaded} {
    background-color: var(--color-accent);
    &::before {
      filter: blur(0px);
      background: transparent;
      animation: none;
    }
  }
  ${props => props.articleSelected} {
    transition: all 0.3s;
    opacity: 1;
  }
  ${props => !props.articleSelected} {
    transition: all 0.3s;
    transition-delay: 0.3s;
    opacity: 0;
  }
`;

const ArticleNumber = styled.label`
  transition: 0.3s;
  color: var(--color-white);
  font-size: 16px;
  overflow: hidden;
  position: absolute;
  z-index: 40;
  transform: translateX(0px);
  ${props => props.articleSelected} {
    transition: 0.3s;
    opacity: 0;
    visibility: hidden;
    ${props => props.animationDirection === "left"} {
      transform: translateX(21px);
    }
    ${props => props.animationDirection === "right"} {
      transform: translateX(-21px);
    }
  }
  ${props => !props.articleSelected} {
    transition: 0.3s;
    transition-delay: 0.3s;
    opacity: 1;
    visibility: visible;
    transform: translateX(0px);
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

const ArticleInformation = styled.div.attrs(props => ({
  style: {
    transitionDelay: !props.articleSelected
      ? !props.dragAnimation
        ? `0s`
        : `0.3s`
      : !props.dragAnimation
      ? `0.3s`
      : `0s`,
    opacity: props.articleSelected
      ? !props.dragAnimation
        ? 1
        : props.fadeOut
      : !props.dragAnimation
      ? 0
      : props.fadeIn,
    transform: props.articleSelected
      ? !props.dragAnimation
        ? `translateY(0px)`
        : `translateY(${props.translateYOut}px)`
      : !props.dragAnimation
      ? `translateY(${props.translateYIn}px)`
      : `translateY(${props.translateYIn}px)`
  }
}))`
  color: var(--color-white);
  position: absolute;
  margin-left: 50px;
  bottom: 130px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @media (max-width: 935px) {
    bottom: 220px;
  }
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

const SwiperPaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 2;
`;

const SwiperPagination = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin: 0px 4px;
  background-color: var(--dark-border-color-strong);
  transition-duration: 500ms;
  &:first-child {
    margin: 0px;
  }
  &:hover {
    cursor: pointer;
  }
  ${props => !props.articleSelected} {
    background-color: white;
    ${ArticleInformation} {
      opacity: 1;
    }
  }
`;

const RightContent = styled.div`
  box-sizing: border-box;
  width: 357.3px;
  background-color: #d8d8d8;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 32px;
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

const SidebarTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SideBarArticleContainer = styled.div`
  height: 89px;
  width: 100%;
  margin: 12px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:nth-child(2) {
    margin-top: 0px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
`;

const SideBarArticleImage = styled.div`
  height: 100%;
  width: 89px;
  margin-right: 16px;
  background-color: #e8e8e8;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  &::before {
    content: "";
    position: absolute;
    vertical-align: middle;
    overflow: hidden;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    background: linear-gradient(to right, #e8e8e8 4%, #ddd 18%, #e8e8e8 36%);
    animation: ${keyframesShimmer} 1s infinite ease-in-out;
  }
  ${props => !props.imageLoaded} {
    background-color: var(--main-background-color);
    &::before {
      filter: blur(0px);
      background: transparent;
      animation: none;
    }
  }
`;

const SideBarArticleInfoContainer = styled.div`
  height: 100%;
  width: 75%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
`;
