import React from "react";
import Header from "./header";
import { render, fireEvent, act } from "@testing-library/react";

describe("Clicking on BurgerMenu", () => {
  const { getByTestId, queryByTestId } = render(<Header />);
  it("should open & close the sidebar", () => {
    // Open
    const button = getByTestId("burgerMenu");
    act(() => {
      fireEvent.click(button);
    });
    // Assertion
    expect(getByTestId("sideBar")).toBeVisible();

    // Close
    const sideBar = queryByTestId("sideBar");
    fireEvent.click(button);
    // Assertion
    expect(sideBar).not.toBeVisible();
  });
});

it("should change burgerMenu to false when clicking outside the responsive header", () => {
  const eventListener = {};
  window.addEventListener = (evt, cb) => (eventListener[evt] = cb);

  const { getByTestId, queryByTestId } = render(
    <React.Fragment>
      <div data-testid="outside" className="outside" />
      <Header />
    </React.Fragment>
  );

  const button = getByTestId("burgerMenu");

  fireEvent.click(button);
  // Assertion
  expect(getByTestId("sideBar")).toBeVisible();

  // Simulate click outside
  act(() => {
    eventListener.mousedown({
      target: getByTestId("outside")
    });
  });
  const sideBar = queryByTestId("sideBar");
  // Assertion
  expect(sideBar).not.toBeVisible();
});
