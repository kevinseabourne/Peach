import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const SubLinkPage = props => {
  const location = useLocation();

  const subLinkPageDataLS = () =>
    JSON.parse(localStorage.getItem("subLinkPageData")) || {};
  const [subLinkPageData, setSubLinkPageData] = useState(subLinkPageDataLS);

  useEffect(() => {
    if (location.state) {
      localStorage.setItem("subLinkPageData", JSON.stringify(location.state));
      setSubLinkPageData(location.state);
    }
  }, [location.state]);

  return (
    <Container data-testid={`${subLinkPageData.subLink}ArticlesPage`}>
      <Wrapper>{subLinkPageData.subLink}</Wrapper>
    </Container>
  );
};

export default SubLinkPage;

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
