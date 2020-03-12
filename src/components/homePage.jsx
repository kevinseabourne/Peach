import React from "react";
import styled from "styled-components";

const HomePage = props => {
  return (
    <Container data-testid="homePage">
      <Wrapper></Wrapper>
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
