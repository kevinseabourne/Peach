import React from "react";
import NavLinks from "../navLinks";
import { render, wait } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("header links", () => {
  it("should render", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <NavLinks />
      </Router>
    );
    await wait(() => expect(container).toBeInTheDocument());
  });
});
