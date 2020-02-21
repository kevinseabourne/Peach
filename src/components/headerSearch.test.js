import React from "react";
import HeaderSearch from "./headerSearch";
import { render, fireEvent, wait } from "@testing-library/react";

describe("header search component", () => {
  it("should open & close the HeaderSearch component", () => {
    const { getByTestId, getByPlaceholderText } = render(<HeaderSearch />);
    // Open
    const searchIcon = getByTestId("SearchIcon");
    fireEvent.click(searchIcon);

    // Assertion
    expect(getByTestId("SearchOverlay")).toBeInTheDocument();

    // Close
    const exitButton = getByTestId("SearchExitButton");
    fireEvent.click(exitButton);

    // Assertion
    wait(() => expect(getByTestId("SearchOverlay")).not.toBeInTheDocument());
  });

  it("should show/hide clear input Button when there is a value or not", () => {
    const { getByTestId, queryByTestId, getByPlaceholderText } = render(
      <HeaderSearch />
    );
    const searchIcon = getByTestId("SearchIcon");
    fireEvent.click(searchIcon);

    expect(getByTestId("searchQueryIconBox")).not.toBeVisible();
    const input = getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "testing" } });

    const clearInputButton = queryByTestId("searchQueryIconBox");
    expect(clearInputButton).toBeVisible();
  });

  it("should clear input value when clicking on clear input Button", () => {
    const { getByTestId, queryByTestId, getByPlaceholderText } = render(
      <HeaderSearch />
    );
    const searchIcon = getByTestId("SearchIcon");
    fireEvent.click(searchIcon);

    expect(getByTestId("searchQueryIconBox")).not.toBeVisible();
    const input = getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "testing" } });

    const clearInputButton = queryByTestId("searchQueryIconBox");
    fireEvent.click(clearInputButton);
    expect(input.value).toBe("");
  });

  it("should show the correct value on input change", () => {
    const { getByTestId, queryByTestId, getByPlaceholderText } = render(
      <HeaderSearch />
    );
    const searchIcon = getByTestId("SearchIcon");
    fireEvent.click(searchIcon);

    const input = getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "testing" } });
    expect(input.value).toBe("testing");
  });
  it("should focus on the input on mount", () => {
    const { getByTestId, queryByTestId, getByPlaceholderText } = render(
      <HeaderSearch />
    );
    const searchIcon = getByTestId("SearchIcon");
    fireEvent.click(searchIcon);

    const input = getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });
});
