import React from "react";
import SideBarLinks from "./sideBarLinks";
import { render, fireEvent } from "@testing-library/react";

describe("Clicking on BurgerMenu", () => {
  const { getByText, getByTestId, queryByTestId } = render(<SideBarLinks />);
  it("should open & close the dropdown when clicking on a link", () => {
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

    // Close
    fireEvent.click(electronicsLink);
    fireEvent.click(homeLink);
    fireEvent.click(healthFitnessLink);

    // Assertion
    expect(getByTestId("sideBarElectronicsDropdown")).not.toBeVisible();
    expect(getByTestId("sideBarHomeDropdown")).not.toBeVisible();
    expect(getByTestId("sideBarHealth & FitnessDropdown")).not.toBeVisible();
  });
});
