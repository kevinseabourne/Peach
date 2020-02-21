import React from "react";
import NewsLetter from "../../components/newsletter.jsx";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("clear input button", () => {
  it("should clear the input and put the input in focus", () => {
    const { getByPlaceholderText, getByTestId, queryByText } = render(
      <NewsLetter />
    );
    const emailInput = getByPlaceholderText("Your email address");

    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });

    const clearInputEmailButton = getByTestId("email-iconBox");

    fireEvent.click(clearInputEmailButton);

    // ------- assertions ---------- //

    // when inputIconBox
    expect(emailInput.value).toBe("");
    expect(emailInput).toHaveFocus();
  });
});

describe("error message should appears when you fail to meet validation requirements", () => {
  it("should show error an message if input is empty", () => {
    const { getByPlaceholderText, getByTestId } = render(<NewsLetter />);
    const emailInput = getByPlaceholderText("Your email address");

    const subscribeButton = getByTestId("Subscribe");

    fireEvent.click(subscribeButton);

    // ------- assertions ---------- //

    // expect error messages to appear in the DOM.
    wait(() => expect(getByTestId("email-errorMessage")).toBeInTheDocument());

    // input values should not change.
    expect(emailInput.value).toBe("");
  });

  it("should show an error message with inputs filled but fail validation requirements", () => {
    const { getByPlaceholderText, getByTestId } = render(<NewsLetter />);
    const emailInput = getByPlaceholderText("Your email address");

    fireEvent.change(emailInput, { target: { value: "test@hotmail" } });
    const subscribeButton = getByTestId("Subscribe");

    fireEvent.click(subscribeButton);

    // ------- assertions ---------- //

    // expect error messages to appear in the DOM.
    wait(() => expect(getByTestId("email-errorMessage")).toBeInTheDocument());

    // input values should not change.
    expect(emailInput.value).toBe("test@hotmail");
  });

  it("should meet validation requirements and not show an error message", () => {
    const { getByPlaceholderText, getByTestId } = render(<NewsLetter />);
    const emailInput = getByPlaceholderText("Your email address");

    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    const subscribeButton = getByTestId("Subscribe");

    fireEvent.click(subscribeButton);

    // ------- assertions ---------- //

    // expect error messages to appear in the DOM.
    wait(() =>
      expect(getByTestId("email-errorMessage")).not.toBeInTheDocument()
    );
  });

  it("should show a loading spinner inside the submit button after validation has been met", () => {
    const { getByPlaceholderText, getByTestId } = render(<NewsLetter />);
    const emailInput = getByPlaceholderText("Your email address");

    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    const subscribeButton = getByTestId("Subscribe");

    fireEvent.click(subscribeButton);

    // ------- assertions ---------- //

    // expect error messages to appear in the DOM.
    wait(() => expect(getByTestId("submitLoading")).toBeInTheDocument());
  });
});
