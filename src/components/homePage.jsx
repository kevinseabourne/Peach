import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SliderSection from "./sliderSection";
import { getAllArticles } from "../components/services/articleService";
import _ from "lodash";

const HomePage = props => {
  const [allArticles, setAllArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  // const [popularArticles, setPopularArticles] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getAllArticles();
      // we want to data fetch all articles here because we want to show all the articles with pagination.
      // also show articles that are popular based on views on the article
      // and admin picks for the carousel along with editor picks at the bottom of the homepage.
      // console.log(allArticles);
      setAllArticles(data);
      handleFeaturedArticles(data);
    }
    fetchData();
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

  const onImageLoad = loadedArticle => {
    console.log("we in");
    const featuredArticlesClone = _.clone(featuredArticles);

    const updatedFeaturedArticles = featuredArticlesClone.map(article => {
      article.imageLoaded = true;
      return article;
    });
    setFeaturedArticles(updatedFeaturedArticles);
    // const { featuredArticles } = props;
    // if (loadedArticle.imageLoaded) {
    //   const featuredArticlesClone = _.clone(featuredArticles);
    //
    //   featuredArticlesClone.map(article => {
    //     article.imageLoaded = false;
    //     return article;
    //   });
    //   setFeaturedArticles(featuredArticlesClone);
    // } else {
    //   const featuredArticlesClone = _.clone(featuredArticles);
    //
    //   featuredArticlesClone.map(article => {
    //     return loadedArticle.id === article.id && article.image
    //       ? (article.imageLoaded = true)
    //       : (article.imageLoaded = false);
    //   });
    //   setFeaturedArticles(featuredArticlesClone);
    // }
  };

  return (
    <Container data-testid="homePage">
      <Wrapper>
        <SliderSection
          featuredArticles={featuredArticles}
          handleFeaturedArticleChange={handleFeaturedArticleChange}
          onImageLoad={onImageLoad}
        />
      </Wrapper>
    </Container>
  );
};

export default HomePage;

const Container = styled.section`
  width: 100%;
  height: 2000px;
  ${"" /* background-color: var(--dark-text-color-soft); */}
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;
