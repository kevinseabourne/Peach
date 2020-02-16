import React from "react";
import Header from "./header";
import {
  render,
  fireEvent,
  getByTestId,
  queryByTestId,
  getByText
} from "@testing-library/react";

describe("Clicking on BurgerMenu", () => {
  const { container } = render(<Header />);
  it("should open a sidebar", () => {
    expect().toBe();
  });
});
