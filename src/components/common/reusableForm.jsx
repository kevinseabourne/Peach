import React, { Component } from "react";
import Joi from "joi-browser";
import { ReusableInput } from "./input";
import { ReusableTextBox } from "./textBox";
import crossIcon from "../../images/cross-icon.svg";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import dangerIcon from "../../images/caution.svg";
import loadingIcon from "../../images/loadingIcon.svg";

// in order to make this reusable you need to pass
// reusableForm(data, error, updateState)

// whenever a function calls setState you could call updateState(state) pass it the state that needs updadting or
// leave state as it is and in component did mount of state is not equal to props then call updateState(state);

export default class ReusableForm extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const data = { ...this.state.data };
    // if (data.cardNumber) {
    //   data.cardNumber = data.cardNumber.replace(/\s/g, ""); // clear the whitespace in the card number
    // }
    const { error } = Joi.validate(data, this.Schema, options);
    if (!error) {
      return null;
    }
    const errors = {};
    // console.log(error.details);
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.Schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.doSubmit();
  };

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const errorMesssage = this.validateProperty(currentTarget);
    if (errorMesssage) {
      errors[currentTarget.name] = errorMesssage;
    } else {
      delete errors[currentTarget.name];
    }

    const data = { ...this.state.data };
    // if (currentTarget.type === "checkbox") {
    //   // you want the checkbox to toggle.
    //   if (currentTarget.className !== "remain-unchecked") {
    //     data[currentTarget.name] = currentTarget.checked;
    //   }
    //   // you want the checkbox to turn on but not off
    //   else if (data[currentTarget.name] === false) {
    //     data[currentTarget.name] = true;
    //   }
    // } else {
    // data[currentTarget.name] = currentTarget.value;
    // }

    data[currentTarget.name] = currentTarget.value;

    this.setState({ data });
    // to make errors show on change setState errors. I took it off because i thought it was annoying to the user.
  };

  ClearInputOnClick = (name, ref) => {
    const data = { ...this.state.data };
    data[name] = "";

    this.setState({ data });

    // after clearing the input put the input back into focus.
    ref.current.focus();
  };

  renderSubscribeButton = (label, loading) => {
    return (
      <SubmitButton
        id={label}
        data-testid={label}
        emailLoading={loading}
        onClick={this.handleSubmit}
      >
        {loading ? (
          <Loading data-testid="submitLoading" loadingIcon={loadingIcon} />
        ) : (
          label
        )}
      </SubmitButton>
    );
  };

  // renderTextBox(name, label, ref) {
  //   const { data, errors } = this.state;
  //   return (
  //     <ReusableTextBox
  //       name={name}
  //       value={data[name]}
  //       label={label}
  //       ref={ref}
  //       onChange={this.handleChange}
  //       onClick={() => this.ClearInputOnClick(name, ref)}
  //       error={errors[name]}
  //     />
  //   );
  // }

  // Input with a delete icon.

  renderInput(name, label, maxLength, ref, type = "text") {
    const { data, errors } = this.state;
    return (
      <ReusableInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        ref={ref}
        onChange={this.handleChange}
        onClick={() => this.ClearInputOnClick(name, ref)}
        error={errors[name]}
        maxLength={maxLength}
      />
    );
  }
}

const Container = styled.div``;

const SubmitButton = styled.button`
  min-width: 91.3px;
  min-height: 49px;
  font-size: 1.1em;
  padding: 14px 24px;
  border-radius: 40px;
  border: none;
  color: #f5f5eb;
  margin-top: 30px;
  font-weight: 700;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: #08aeea;
  background: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
  -webkit-transform: translateY(0px) scale(1);
  -ms-transform: translateY(0px) scale(1);
  transform: translateY(0px) scale(1);
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  position: relative;
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1) translateY(-3.5px);
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0 auto;
  background-image: url(${props => props.loadingIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 42%;
`;

const Title = styled.label`
  font-size: 1.26rem;
  font-weight: 700;
`;

const TextBox = styled.textarea`
  height: 200px;
  width: 100%;
  border: none;
  margin-top: 6.2px;
  margin-bottom: -6.2px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(51, 51, 51);
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
  box-shadow: 12px 12px 20px -12px rgba(0, 0, 0, 0.35);
  &:focus {
    outline: 0;
  }
`;

// const IconBox = styled.div`
//   width: 44px;
//   height: 100%;
//   top: 0;
//   bottom: 0;
//   right: 0px;
//   margin: auto;
//   position: absolute;
//   border-top-right-radius: 2px;
//   border-bottom-right-radius: 2px;
//   background-color: transparent;
//   background-image: url(${props => props.image});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: 31%;
//   transition: all 0.36s;
//   opacity: 0;
//   transform: rotate(100deg) scale(0);
//   &:hover {
//     cursor: pointer;
//   }
//   ${props => !props.value} {
//     opacity: 1;
//     transform: rotate(0deg) scale(1);
//   }
// `;

const Error = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0px;
  &.errorAnimation-enter {
    transform: scale(0.4);
    opacity: 0;
    transition: all 0.1s linear;
  }
  &.errorAnimation-enter-active {
    transform: scale(1);
    transition: all 0.1s linear;
    opacity: 1;
  }
  &.errorAnimation-exit {
    transform: scale(1);
    transition: all 0.1s linear;
    opacity: 1;
  }
  &.errorAnimation-exit-active {
    transform: scale(0.4);
    opacity: 0;
    transition: all 0.1s linear;
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

// const Image = styled.div`
//   height: 22px;
//   width: 24px;
//   margin-left: 6px;
//   margin-right: 12px;
//   background: url(${props => props.image});
//   background-position: center;
//   background-size: contain;
//   background-repeat: no-repeat;
//   opacity: 0;
//   transiton: all 0.3s ease;
//   &:hover {
//     animation: ${shakeBottom} 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
//       infinite both;
//   }
//   ${props => !props.error} {
//     opacity: 1;
//     animation: ${jelloHorizontal} 0.9s;
//   }
// `;
//
// const ErrorMessage = styled.p`
//   color: white;
//   margin: 0.57143em 0 0.28571em;
//   line-height: 18px;
//   font-weigth: 300;
//   font-size: 14px;
//   /* opacity: 0; */
//   transition: all 0.3s ease;
//   &:hover {
//     cursor: default;
//   }
//   ${props => !props.error} {
//     opacity: 1;
// }
//   }
// `;
