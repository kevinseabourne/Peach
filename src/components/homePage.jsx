import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FeaturedSection from "./featuredSection";
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
    }
    fetchData();
    return () => {
      // timer.current && clearTimeout(timer.current);
    };
  }, []);

  return (
    <Container data-testid="homePage">
      <Wrapper>
        <FeaturedSection />
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
