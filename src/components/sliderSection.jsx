import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";

const SliderSection = props => {
  const [frontPageArticles, setFrontPageArticles] = useState([
    {
      id: 1,
      catergory: "Routers",
      title: "Top 5 Best Routers 2020",
      author: "Kevin Seabourne",
      date: "May 2nd, 2020",
      selected: true,
      image:
        "https://chpistel.sirv.com/Peach/webaroo-tN344soypQM-unsplash.jpg?w=1400&h=653&format=jpg"
    },
    {
      id: 2,
      catergory: "VPNs",
      title: "Top 5 best VPNs 2020",
      author: "Kevin Seabourne",
      date: "Febuary 9th, 2020",
      selected: false,
      image:
        "https://chpistel.sirv.com/Peach/petter-lagson-VmMimaq445E-unsplash.jpg?w=1400&h=576&format=jpg"
    }
  ]);

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

  const handleArticleChange = SelectedArticle => {
    const frontPageArticlesClone = _.clone(frontPageArticles);
    const currentArticleIndex = frontPageArticlesClone.findIndex(
      article => article.selected
    );
    const selectedArticleIndex = frontPageArticlesClone.indexOf(
      SelectedArticle
    );

    const updatedFrontpageArticles = frontPageArticlesClone.map(article => {
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
    setFrontPageArticles(updatedFrontpageArticles);
  };

  return (
    <Container>
      {frontPageArticles.map(article => (
        <BackgroundImage
          key={article.id}
          image={article.image}
          articleSelected={article.selected}
        />
      ))}
      <LeftContent>
        <Featured>
          <FeaturedBox>
            {frontPageArticles.map(fpArticle => {
              return (
                <ArticleNumber
                  key={fpArticle.id}
                  index={frontPageArticles.indexOf(fpArticle) + 1}
                  articleSelected={fpArticle.selected}
                  animationDirection={fpArticle.animationDirection}
                >
                  {frontPageArticles.indexOf(fpArticle) + 1}
                </ArticleNumber>
              );
            })}
          </FeaturedBox>

          <FeaturedTitle>Featured</FeaturedTitle>
        </Featured>
        {frontPageArticles.map(fpArticle => {
          return (
            <ArticleInformation
              image={fpArticle.image}
              articleSelected={fpArticle.selected}
              key={fpArticle.id}
            >
              <Catergory>{fpArticle.catergory}</Catergory>
              <Title>{fpArticle.title}</Title>
              <AuthorDateContainer>
                <Author>By {fpArticle.author}</Author>
                <ArticleDate>{fpArticle.date}</ArticleDate>
              </AuthorDateContainer>
            </ArticleInformation>
          );
        })}
        <SwiperPaginationContainer>
          {frontPageArticles.map(fpArticle => (
            <SwiperPagination
              key={fpArticle.id}
              articleSelected={fpArticle.selected}
              onClick={() => handleArticleChange(fpArticle)}
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
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.5s;
  background: url(${props => props.image});
  background-position: center;
  z-index: -999;
  background-size: cover;
  background-repeat: no-repeat;
  ${props => props.articleSelected} {
    transition: all 0.5s ease;
    opacity: 0;
  }
  ${props => !props.articleSelected} {
    transition: all 0.5s ease;
    transition-delay: 0.1s;
    opacity: 1;
  }
`;

const LeftContent = styled.div`
  height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Featured = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FeaturedBox = styled.div`
  transition: 0.5s;
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
    transition: all 0.5s;
    opacity: 1;
  }
  ${props => !props.articleSelected} {
    transition: all 0.5s;
    transition-delay: 0.5s;
    opacity: 0;
  }
`;

const ArticleNumber = styled.label`
  transition: 0.5s ease;
  color: var(--color-white);
  font-size: 16px;
  overflow: hidden;
  transform: translateX(0px);
  position: absolute;
  ${props => props.articleSelected} {
    transition: 0.5s ease;
    opacity: 0;
    ${props => props.animationDirection === "left"} {
      transform: translateX(-21px);
    }
    ${props => props.animationDirection === "right"} {
      transform: translateX(21px);
    }
  }
  ${props => !props.articleSelected} {
    transition: 0.5s ease;
    transition-delay: 0.5s;
    opacity: 1;
    transform: scale(1) translateX(0px);
  }
`;

const FeaturedTitle = styled.div`
  color: var(--color-white);
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
`;

const ArticleInformation = styled.div`
  color: var(--color-white);
  position: absolute;
  bottom: 130px;
  left: 0;
  transition: all 0.5s;
 ${props => props.articleSelected} {
    transition: all 0.5s;
    opacity: 0;
    transform: translateY(50px);
  }
 ${props => !props.articleSelected} {
    transition: all 0.5s;
    transition-delay: 0.5s;
    opacity: 1;
    transform: translateY(0px);
  }
}
`;

const Catergory = styled.span`
  font-size: var(--font-size-xs);
`;

const Title = styled.h2``;

const AuthorDateContainer = styled.div``;

const Author = styled.label`
  &::after {
    content: "";
    margin: 0rem 0.5rem;
    vertical-align: middle;
    display: inline-flex;
    align-self: center;
    background-color: currentColor;
    height: 0.25rem;
    width: 0.25rem;
    border-radius: 9999px;
    opacity: 0.5;
  }
`;

const ArticleDate = styled.label`
  color: rgba(255, 255, 255, 0.7);
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
  background-color: rgba(255, 255, 255, 0.7);
  transition-duration: 500ms;
  &:first-child {
    margin: 0px;
  }
  &:hover {
    cursor: pointer;
  }
  ${props => !props.articleSelected} {
    background-color: black;
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
