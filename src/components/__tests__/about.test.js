import React from "react";
import About from "../about";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("react router", () => {
  it("render about component", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <About />
      </Router>
    );
    expect(container).toBeInTheDocument();
  });
});
