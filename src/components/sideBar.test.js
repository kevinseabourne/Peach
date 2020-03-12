import React from "react";
import SideBar from "./sideBar";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";

describe("Clicking on ExitButton in sideBar", () => {
  const history = createMemoryHistory();
  const { getByTestId, queryByTestId } = render(
    <Router history={history}>
      <SideBar />
    </Router>
  );
  it("should close the sidebar", () => {
    const button = getByTestId("sideBarExitButton");
    fireEvent.click(button);
    // Assertion
    expect(queryByTestId("sideBar")).not.toBeVisible();
  });
});
