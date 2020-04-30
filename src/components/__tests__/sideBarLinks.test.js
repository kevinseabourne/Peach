import React from "react";
import SideBarLinks from "../sideBarLinks";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";

describe("Sidebar Links", () => {
  test.each([
    ["Electronics", "All Electronics", "Electronics"],
    ["Home", "All Home", "Home"],
    ["Health & Fitness", "All Health & Fitness", "Health & Fitness"]
  ])(
    "should open & close link dropdowns and subLinks should appear",
    (linkName, subLinkName, expected) => {
      const history = createMemoryHistory();
      const { getByText, getByTestId } = render(
        <Router history={history}>
          <SideBarLinks />
        </Router>
      );

      // Open Link Dropdown
      const link = getByText(linkName);
      fireEvent.click(link);

      // Assertion
      // link dropdown should appear
      expect(getByTestId(`sideBar${linkName}Dropdown`)).toBeVisible();

      // subLinks should appear in dropdown
      const subLink = getByText(subLinkName);
      expect(subLink).toBeInTheDocument();

      // Close
      fireEvent.click(link);
      // Assertion
      expect(getByTestId(`sideBar${expected}Dropdown`)).not.toBeVisible();
    }
  );
});

describe("Clicking on links", () => {
  it("should leave dropdown links open, when clicking on other dropdown links", () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <SideBarLinks />
      </Router>
    );
    // Open
    const electronicsLink = getByText("Electronics");
    const homeLink = getByText("Home");
    const healthFitnessLink = getByText("Health & Fitness");

    fireEvent.click(electronicsLink);
    fireEvent.click(homeLink);
    fireEvent.click(healthFitnessLink);

    // Assertion
    expect(getByTestId("sideBarElectronicsDropdown")).toBeVisible();
    expect(getByTestId("sideBarHomeDropdown")).toBeVisible();
    expect(getByTestId("sideBarHealth & FitnessDropdown")).toBeVisible();
  });
});
