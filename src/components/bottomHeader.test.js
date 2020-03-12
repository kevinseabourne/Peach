import React from "react";
import BottomHeader from "./bottomHeader";
import { render, fireEvent, wait } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("header title & logo", () => {
  it("should change routes to homePage", async () => {
    const history = createMemoryHistory();
    const { container, getByTestId, queryByTestId, getByText } = render(
      <Router history={history}>
        <BottomHeader />
      </Router>
    );
    const link = getByTestId("titleLogo");
    fireEvent.click(link);

    await wait(() => expect(history.location.pathname).toBe("/"));
  });
});
