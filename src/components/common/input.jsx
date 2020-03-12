import React from "react";
import styled, { keyframes } from "styled-components";
import crossIcon from "../../images/cross-icon.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import errorIcon from "../../images/error.svg";

// Input
// - input with label
// - Delete icon at the end when there is a name to clear the input.

export const ReusableInput = React.forwardRef((props, ref) => {
  const {
    label,
    error, // a boolean name letting the compnent know when to hide the internal label when empty.
    maxLength,
    onChange,
    onClickIconBox,
    onClickErrorBox,
    name,
    doSubmit,
    value,
    ...rest
  } = props;
  // CSS needs a boolean value for 'in' property error is either a string or not defined
  const errorDefined = error ? true : false;
  return (
    <Container>
      <InputContainer error={error}>
        <Input
          {...rest}
          ref={ref}
          onChange={onChange}
          type="text"
          name={name}
          id={name}
          placeholder={label}
          maxLength={maxLength}
          value={value}
        />
        <IconBox
          image={crossIcon}
          onClick={onClickIconBox}
          value={value.length >= 1}
          data-testid={`${name}-iconBox`}
        />
      </InputContainer>
      <TransitionGroup component={null}>
        {error && (
          <CSSTransition
            in={errorDefined}
            classNames="errorAnimation"
            timeout={200}
            unmountOnExit
          >
            <Error
              onClick={onClickErrorBox}
              error={error}
              data-testid={`${name}-errorMessage`}
            >
              <Image image={errorIcon} error={error} />
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

const InputContainer = styled.div`
  border: 1px solid var(--light-border-color);
  background-color: white;
  font-weight: 500;
  color: rgb(51, 51, 51);
  border-radius: 0px;
  height: 38px;
  width: 100%;
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
    color: rgb(51, 51, 51);
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

const Input = styled.input`
  padding: 7px 42px 7px 16px;
  border: none;
  font-size: 1rem;
  transition: all 0.2s;
  border-radius: 0px;
  box-sizing: border-box;
  outline: none;
  cursor: text;
  height: 100%;
  min-height: 40px;
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
  transition: all 0.25s;
  opacity: 0;
  transform: rotate(45deg) scale(0);
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
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid var(--color-error);
  position: relative;
  &:before {
    position: absolute;
    display: inline-block;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 7px solid var(--color-error);
    top: -7.5px;
    left: 26px;
    content: "";
  }
  &:after {
    position: absolute;
    display: inline-block;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 7px solid white;
    top: -6.5px;
    left: 26px;
    content: "";
  }
  &.errorAnimation-enter {
    transform: scale(0.1);
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
    transform: scale(0.1);
    opacity: 0;
    transition: all 0.2s;
  }
`;

const Image = styled.div`
  height: 22px;
  width: 24px;
  margin-left: 8px;
  margin-right: 8px;
  background: url(${props => props.image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  transiton: all 0.3s ease;
  ${props => !props.error} {
    opacity: 1;
  }
`;

const ErrorMessage = styled.div`
  color: var(--color-error);
  margin: auto 0 auto;
  line-height: 18px;
  font-weigth: 500;
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
