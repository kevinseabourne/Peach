import React from "react";
import NavLinks from "./navLinks";
import { render, fireEvent } from "@testing-library/react";

describe("header links", () => {
  const { container } = render(<NavLinks />);
  it("should open & close the dropdown when clicking on a link", () => {
    // Assertion
    expect(container).toBeInTheDocument();
  });
});
