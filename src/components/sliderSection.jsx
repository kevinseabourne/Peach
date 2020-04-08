import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import LazyLoad from "react-lazyload";
import _ from "lodash";

const SliderSection = props => {
  const ref = useRef(null);
  const [mouseDownPosition, setMouseDownPosition] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [fadeIn, setFadeIn] = useState(null);
  const [fadeOut, setFadeOut] = useState(1);
  const [translateYIn, setTranslateYIn] = useState(19);
  const [translateYOut, setTranslateYOut] = useState(null);
  const [dragAnimation, setDragAnimation] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");

  const [articles] = useState([
    {
      title: "Few Facts About Streaming and Music Creation",
      date: "April 29th, 2020"
    },
    {
      title: "The Real Reason Why Money Can’t Buy You Freedom",
      date: "May 27th, 2020"
    },
    {
      title: "Hacking a Cheap $99 Camera to Do More Than It’s Worth",
      date: "May 3, 2020"
    },
    {
      title: "10 Eating Habits That Rewire Your Brain for Success",
      date: "May 25, 2020"
    }
  ]);

  const handleArticleSwipeChange = swipe => {
    const { featuredArticles, handleFeaturedArticleChange } = props;
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

  const { featuredArticles, handleFeaturedArticleChange, onImageLoad } = props;

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
        <LazyLoad key={article.id} once={true} height={653} offset={100}>
          <BackgroundImage
            key={article.id}
            image={article.image[1]}
            loadImage={`${article.image[0]}&w=42`}
            imageLoaded={article.imageLoaded}
            articleSelected={article.selected}
            animationDirection={article.animationDirection}
            dragAnimation={mouseDown}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            data-testid={`${article.title} background-image`}
          />
          <ImageLoader
            src={article.image[1]}
            onLoad={() => onImageLoad(article, featuredArticles)}
          />
        </LazyLoad>
      ))}
      <LeftContent>
        <Featured>
          <FeaturedBox>
            {featuredArticles.map(fpArticle => {
              return (
                <ArticleNumber
                  key={fpArticle.id}
                  index={featuredArticles.indexOf(fpArticle) + 1}
                  articleSelected={fpArticle.selected}
                  animationDirection={fpArticle.animationDirection}
                  data-testid={`${fpArticle.title} article-number`}
                >
                  {featuredArticles.indexOf(fpArticle) + 1}
                </ArticleNumber>
              );
            })}
          </FeaturedBox>

          <FeaturedTitle>Featured</FeaturedTitle>
        </Featured>
        {featuredArticles.map(fpArticle => {
          return (
            <ArticleInformation
              image={fpArticle.image[1]}
              articleSelected={fpArticle.selected}
              key={fpArticle.id}
              dragAnimation={dragAnimation}
              fadeIn={fadeIn}
              fadeOut={fadeOut}
              translateYOut={translateYOut}
              translateYIn={translateYIn}
              data-testid={`${fpArticle.title} Container`}
            >
              <Catergory>{fpArticle.catergory}</Catergory>
              <Title data-testid={`${fpArticle.id}title`}>
                {fpArticle.title}
              </Title>
              <AuthorDateContainer>
                <Author>By {fpArticle.author}</Author>
                <ArticleDate>
                  {new Date().toDateString(fpArticle.datePublished)}
                </ArticleDate>
              </AuthorDateContainer>
            </ArticleInformation>
          );
        })}
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
      <RightContent>
        <SideBarTitle>What's Hot</SideBarTitle>
        {articles.map(article => (
          <SideBarArticleContainer key={articles.indexOf(article)}>
            <SideBarArticleImage />
            <SideBarArticleInfoContainer>
              <SideBarArticleTitle>{article.title}</SideBarArticleTitle>
              <ArticleDate>{article.date}</ArticleDate>
            </SideBarArticleInfoContainer>
          </SideBarArticleContainer>
        ))}
      </RightContent>
    </Container>
  );
};

export default SliderSection;

const Container = styled.div`
  height: 653px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  @media (max-width: 935px) {
    height: 100vh;
  }
`;

// const keyframesShimmer = keyframes`
// 0% {
//    transform: translateX(-100%);
//  }
//  100% {
//    transform: translateX(100%);
//  }
// `;

// const PlaceHolder = styled.img`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   background: linear-gradient(to right, #ddd 4%, #e8e8e8 25%, #ddd 36%);
//   z-index: -9999;
//   animation: ${keyframesShimmer} 1.5s infinite ease-in-out;
// `;

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
  background: url(${props => props.loadImage}), url(${props => props.image});
  filter: blur(8px);
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
    background: url(${props => props.image});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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
  transition: 0.3s;
  background-color: var(--color-accent);
  color: var(--color-white);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
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

const FeaturedTitle = styled.div`
  color: var(--color-white);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &::before {
    content: "";
    margin: 0rem 0.5rem;
    vertical-align: middle;
    display: inline-flex;
    align-self: center;
    background-color: currentColor;
    height: 0.15rem;
    width: 1rem;
    opacity: 0.5;
  }
  &:hover {
    cursor: default;
  }
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
  transition: all 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @media (max-width: 935px) {
    bottom: 220px;
  }
`;

const Catergory = styled.span`
  font-size: var(--font-size-xs);
  letter-spacing: 0.2px;
  color: var(--color-white);
`;

const Title = styled.h2``;

const AuthorDateContainer = styled.div``;

const Author = styled.label`
  color: rgba(255, 255, 255, 0.7);
  &::after {
    content: "";
    margin: 0rem 0.5rem;
    vertical-align: middle;
    display: inline-flex;
    align-self: center;
    background-color: rgba(255, 255, 255, 0.7);
    height: 0.25rem;
    width: 0.25rem;
    border-radius: 9999px;
    opacity: 0.5;
  }
`;

const ArticleDate = styled.label`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
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
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  padding: 32px;
  margin-right: 50px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @media (max-width: 935px) {
    display: none;
  }
`;

const SideBarTitle = styled.label`
  font-size: var(--font-size-xl);
  align-self: flex-start;
  color: var(--color-white);
  margin-bottom: 24px;
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
  background-color: var(--main-background-color);
  &:hover {
    cursor: pointer;
  }
`;

const SideBarArticleInfoContainer = styled.div`
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
`;

const SideBarArticleTitle = styled.h4`
  margin: 0;
  color: var(--color-white);
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
  }
`;
