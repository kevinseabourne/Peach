import React from "react";
import SideBar from "./sideBar";
import { render, fireEvent } from "@testing-library/react";

describe("Clicking on ExitButton in sideBar", () => {
  const { getByTestId, queryByTestId } = render(<SideBar />);
  it("should close the sidebar", () => {
    const button = getByTestId("sideBarExitButton");
    fireEvent.click(button);
    // Assertion
    expect(queryByTestId("sideBar")).not.toBeVisible();
  });
});
