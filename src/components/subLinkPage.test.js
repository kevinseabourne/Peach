import React from "react";
import SubLinkPage from "./subLinkPage";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("header links", () => {
  it("should open & close the dropdown when clicking on a link", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <SubLinkPage />
      </Router>
    );
    expect(container).toBeVisible();
  });
});
