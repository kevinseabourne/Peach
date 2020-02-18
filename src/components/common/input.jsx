import React from "react";
import styled, { keyframes } from "styled-components";
import crossIcon from "../../images/cross-icon.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import dangerIcon from "../../images/caution.svg";

// Input
// - input with label
// - Delete icon at the end when there is a name to clear the input.

export const ReusableInput = React.forwardRef((props, ref) => {
  const {
    label,
    error, // a boolean name letting the compnent know when to hide the internal label when empty.
    maxLength,
    onChange,
    onClick,
    name,
    type = "text",
    doSubmit,
    value,
    title,
    ...rest
  } = props;
  return (
    <Container>
      {title && <Title>{label}</Title>}
      <InputContainer error={error}>
        <InnerLabel value={value.length >= 1}>{label}</InnerLabel>
        <Input
          {...rest}
          ref={ref}
          onChange={onChange}
          type={type}
          name={name}
          id={name}
          placeholder={label}
          maxLength={maxLength}
          value={value}
        />
        <IconBox
          image={crossIcon}
          onClick={onClick}
          value={value.length >= 1}
          data-testid={`${name}-iconBox`}
        />
      </InputContainer>
      <TransitionGroup component={null}>
        {error && (
          <CSSTransition
            in={error}
            classNames="errorAnimation"
            timeout={200}
            unmountOnExit
          >
            <Error error={error} data-testid={`${name}-errorMessage`}>
              <Image image={dangerIcon} error={error} />
              <ErrorMessage error={error}>{error}</ErrorMessage>
            </Error>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Container>
  );
});

const Container = styled.div`
  width: 100%;
`;

const Title = styled.label`
  font-size: 1.26rem;
  font-weight: 700;
`;

const InputContainer = styled.div`
  border: "1px solid white";
  box-shadow: 0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3);
  background-color: white;
  font-size: 14px;
  font-weight: 500;
  color: rgb(51, 51, 51);
  border-radius: 12px;
  height: 56px;
  width: 100%;
  margin-top: 6.2px;
  margin-bottom: 19px;
  outline: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;
  &:focus {
    border-color: #999999;
    box-shadow: 0 0 0 1px #999999;
    transition: all 0.3s ease-in-out;
  }
  &:focus-within {
    font-weight: 500;
    font-size: 14px;
    color: rgb(51, 51, 51);
    /* border-color: grey; */
    /* box-shadow: 0 0 0 1px grey; */
    outline: none;
    transition: all 0.3s ease-in-out;
  }
  ${props => !props.error} {
    margin-bottom: 0px;
  }
`;

const blurImage = keyframes`
from {
opacity: 0;
}
to {
opacity: 1;
}
`;

const InnerLabel = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  letter-spacing: 0px;
  margin-top: 7.2px;
  margin-bottom: -2px;
  transition: all 0.2s;
  transform: translateY(10px);
  padding-left: 11px;
  position: absolute;
  z-index: 10;
  pointer-events: none;
  animation-name: ${blurImage};
  animation-duration: 0.2s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-direction: forward;
  opacity: 0;
  ${props => !props.value} {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Input = styled.input`
  padding: ${props =>
    props.value.length >= 1 ? "14.5px 40px 0px 12px" : "0px 12px 0px 12px"};
  border: none;
  transition: all 0.2s;
  border-radius: 12px;
  box-sizing: border-box;
  outline: none;
  cursor: text;
  height: 100%;
  min-height: 42px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(51, 51, 51);
`;

const IconBox = styled.div`
  width: 44px;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0px;
  margin: auto;
  position: absolute;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: transparent;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 31%;
  transition: all 0.36s;
  opacity: 0;
  transform: rotate(100deg) scale(0);
  &:hover {
    cursor: pointer;
  }
  ${props => !props.value} {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
`;

const Error = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  &.errorAnimation-enter {
    transform: scale(0.4);
    opacity: 0;
    transition: all 0.2s;
  }
  &.errorAnimation-enter-active {
    transform: scale(1);
    transition: all 0.2s;
    opacity: 1;
  }
  &.errorAnimation-exit {
    transform: scale(1);
    transition: all 0.2s;
    opacity: 1;
  }
  &.errorAnimation-exit-active {
    transform: scale(0.4);
    opacity: 0;
    transition: all 0.2s;
  }
`;

const jelloHorizontal = keyframes`
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
`;

const shakeBottom = keyframes`
  0%,
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
  }
  10% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
  20%,
  40%,
  60% {
    -webkit-transform: rotate(-4deg);
            transform: rotate(-4deg);
  }
  30%,
  50%,
  70% {
    -webkit-transform: rotate(4deg);
            transform: rotate(4deg);
  }
  80% {
    -webkit-transform: rotate(-2deg);
            transform: rotate(-2deg);
  }
  90% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
`;

const Image = styled.div`
  height: 22px;
  width: 24px;
  margin-left: 6px;
  margin-right: 12px;
  background: url(${props => props.image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  transiton: all 0.3s ease;
  &:hover {
    animation: ${shakeBottom} 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
      infinite both;
  }
  ${props => !props.error} {
    opacity: 1;
    animation: ${jelloHorizontal} 0.9s both;
  }
`;

const ErrorMessage = styled.div`
  color: white;
  margin: 0.57143em 0 0.28571em;
  line-height: 18px;
  font-weigth: 300;
  font-size: 14px;
  opacity: 0;
  transition: all 0.3s ease;
  &:hover {
    cursor: default;
  }
  ${props => !props.error} {
    opacity: 1;
  }
`;
