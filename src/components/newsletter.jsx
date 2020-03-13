import React from "react";
import styled from "styled-components";
import Joi from "joi-browser";
import ReusableForm from "./common/reusableForm";

class Newsletter extends ReusableForm {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
  }
  state = {
    data: {
      email: ""
    },
    errors: {},
    emailLoading: false
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  Schema = {
    email: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .options({
        language: {
          key: "",
          any: {
            empty: "Enter an email"
          },
          string: {
            email: "Enter a valid email"
          }
        }
      })
  };

  doSubmit = () => {
    this.setState({ emailLoading: true });
    this.timer = setTimeout(() => {
      this.setState({ emailLoading: false });
    }, 3000);
  };

  render() {
    return (
      <NewsLetterContainer>
        <SubHeading>NewsLetter</SubHeading>
        <Message>
          Subscribe to our newsletter and get our newest updates right on your
          inbox.
        </Message>
        {this.renderInput("email", "Your email address", "", this.emailRef)}
        {this.renderSubscribeButton("Subscribe", this.state.emailLoading)}
      </NewsLetterContainer>
    );
  }
}

export default Newsletter;

const NewsLetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 32px;
  @media (max-width: 935px) {
    display: none;
  }
`;

const SubHeading = styled.h3`
  font-size: var(--font-size-lg: 1.125rem);
`;

const Message = styled.p``;
