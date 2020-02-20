import React from "react";
import HeaderSearch from "./headerSearch";
import { render, fireEvent } from "@testing-library/react";

describe("header search component", () => {
  const { getByTestId } = render(<HeaderSearch />);
  it("should open & close the HeaderSearch component", () => {
    // Open
    const searchIcon = getByTestId("SearchIcon");
    fireEvent.click(searchIcon);

    // Assertion
    expect(getByTestId("SearchOverlay")).toBeVisible();

    // Close
    const exitButton = getByTestId("SearchExitButton");
    fireEvent.click(exitButton);

    // Assertion
    expect(getByTestId("SearchOverlay")).not.toBeVisible();
  });
});
