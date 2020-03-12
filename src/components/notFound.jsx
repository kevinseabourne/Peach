import React from "react";
import styled from "styled-components";

const NotFound = props => {
  return <Container data-testid="404">404 Page not Found</Container>;
};

export default NotFound;

const Container = styled.div`
  font-size: 16px;
`;
