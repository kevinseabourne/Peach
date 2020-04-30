import React from "react";
import Header from "../header";
import { render, fireEvent, act } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Clicking on BurgerMenu", () => {
  it("should open & close the sidebar", () => {
    const history = createMemoryHistory();
    const { getByTestId, queryByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );
    // Open
    const button = getByTestId("burgerMenu");

    fireEvent.click(button);

    // Assertion
    expect(getByTestId("sideBar")).toBeVisible();

    // Close
    const sideBar = queryByTestId("sideBar");
    fireEvent.click(button);
    // Assertion
    expect(sideBar).not.toBeVisible();
  });

  it("should not close the sideBar when clicking on the sideBar", () => {
    const eventListener = {};
    window.addEventListener = (evt, cb) => (eventListener[evt] = cb);

    const history = createMemoryHistory();
    const { getByTestId, queryByTestId } = render(
      <React.Fragment>
        <div data-testid="outside" className="outside" />
        <Router history={history}>
          <Header />
        </Router>
      </React.Fragment>
    );
    const button = getByTestId("burgerMenu");
    fireEvent.click(button);

    // Assertion
    expect(getByTestId("sideBar")).toBeVisible();

    // click outside
    act(() => {
      eventListener.mousedown({
        target: getByTestId("sideBar")
      });
    });

    // Assertion
    expect(queryByTestId("sideBar")).toBeVisible();
  });

  it("should change burgerMenu to false when clicking outside the responsive header", () => {
    const eventListener = {};
    window.addEventListener = (evt, cb) => (eventListener[evt] = cb);

    const history = createMemoryHistory();
    const { getByTestId, queryByTestId } = render(
      <React.Fragment>
        <div data-testid="outside" className="outside" />
        <Router history={history}>
          <Header />
        </Router>
      </React.Fragment>
    );
    const button = getByTestId("burgerMenu");
    fireEvent.click(button);

    // Assertion
    expect(getByTestId("sideBar")).toBeVisible();

    // click outside
    act(() => {
      eventListener.mousedown({
        target: getByTestId("outside")
      });
    });

    // Assertion
    expect(queryByTestId("sideBar")).not.toBeVisible();
  });
});
