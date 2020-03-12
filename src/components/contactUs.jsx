import React from "react";
import styled from "styled-components";

const ContactUs = props => {
  return (
    <Container data-testid="contactPage">
      <Wrapper>Contact Us</Wrapper>
    </Container>
  );
};

export default ContactUs;

const Container = styled.section`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 1400px;
`;
