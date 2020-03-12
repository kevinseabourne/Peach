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
    expect(getByTestId("email-errorMessage")).toBeInTheDocument();

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
    expect(getByTestId("email-errorMessage")).toBeInTheDocument();

    // input values should not change.
    expect(emailInput.value).toBe("test@hotmail");
  });
});

describe("pass validation", () => {
  it("should meet validation requirements and not show an error message", async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <NewsLetter />
    );
    const emailInput = getByPlaceholderText("Your email address");

    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    const subscribeButton = getByTestId("Subscribe");

    fireEvent.click(subscribeButton);

    // ------- assertions ---------- //

    // expect error messages not to appear in the DOM.
    await wait(() =>
      expect(queryByTestId("email-errorMessage")).not.toBeInTheDocument()
    );
  });
});

describe("close error message", () => {
  it("should close the error message when clicking on it", async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <NewsLetter />
    );
    const emailInput = getByPlaceholderText("Your email address");

    fireEvent.change(emailInput, { target: { value: "test@h" } });

    const subscribeButton = getByTestId("Subscribe");
    fireEvent.click(subscribeButton);

    const errorMessage = getByTestId("email-errorMessage");
    await wait(() =>
      expect(queryByTestId("email-errorMessage")).toBeInTheDocument()
    );

    fireEvent.click(errorMessage);

    // ------- assertions ---------- //
    await wait(() =>
      expect(queryByTestId("email-errorMessage")).not.toBeInTheDocument()
    );
    expect(emailInput).toHaveFocus();
  });

  it("should show a loading spinner inside the submit button after validation has been met and the loading spinner should leave once http request has been made", async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <NewsLetter />
    );
    const emailInput = getByPlaceholderText("Your email address");

    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    const subscribeButton = getByTestId("Subscribe");

    fireEvent.click(subscribeButton);

    // ------- assertions ---------- //

    // expect error messages to appear in the DOM.
    expect(getByTestId("submitLoading")).toBeInTheDocument();

    // expect error messages to dissapear after request has been made.
    await wait(() =>
      expect(queryByTestId("submitLoading")).not.toBeInTheDocument()
    );
  });
});
