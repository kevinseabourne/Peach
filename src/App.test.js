import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import App from "./App";
import { MemoryRouter, Router } from "react-router-dom";
import SubLinkPage from "./components/subLinkPage";
import { createMemoryHistory } from "history";
import {
  Link,
  createHistory,
  createMemorySource,
  LocationProvider
} from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("App component renders", () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(container).toBeInTheDocument();
});

describe("header title & logo", () => {
  test.each([
    ["home", "homePage"],
    ["about", "aboutPage"],
    ["contact", "contactPage"]
  ])("test", async (linkName, expected) => {
    const history = createMemoryHistory();
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const link = getByText(linkName);
    fireEvent.click(link);
    await wait(() => expect(getByTestId(expected)).toBeVisible());
  });
});

describe("header links", () => {
  it("should go to the link clicked on", async () => {
    const history = createMemoryHistory();
    const { container, getByTestId, queryByTestId, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const link = getByTestId("navLinkElectronics");
    fireEvent.mouseOver(link);
    const subLink = getByTestId("subLinkVPNs");
    fireEvent.click(subLink);

    expect(getByTestId("subLinkVPNsPage")).toBeVisible();
    expect(container).toBeVisible();
  });

  it("should open & close the dropdown when clicking on a link", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const link = getByTestId("navLinkHome");
    fireEvent.mouseOver(link);
    const subLink = getByTestId("subLinkBedroom");
    fireEvent.click(subLink);

    expect(getByTestId("subLinkBedroomPage")).toBeVisible();
  });
});

describe("header title & logo", () => {
  test.each([
    ["Electronics", "Routers"],
    ["Home", "Bedroom"],
    ["Health & Fitness", "All Health & Fitness"]
  ])("test", async (linkName, expected) => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const burgerMenu = getByTestId("ResponsiveBurgerMenu");
    fireEvent.click(burgerMenu);

    const Link = getByTestId(`sideBar${linkName}Link`);
    fireEvent.click(Link);

    const subLink = getByTestId(`subLink${expected}`);
    fireEvent.click(subLink);

    expect(getByTestId(`subLink${expected}Page`)).toBeInTheDocument();
  });
});

describe("sideBar links", () => {
  const fireResize = width => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  };
  // it("should go to the link clicked on", async () => {
  //   const history = createMemoryHistory();
  //   const { container, getByTestId, queryByTestId, getByText } = render(
  //     <Router history={history}>
  //       <App />
  //     </Router>
  //   );
  //   // fireResize(500);
  //   const burgerMenu = getByTestId("ResponsiveBurgerMenu");
  //   fireEvent.click(burgerMenu);
  //
  //   const electronicsLink = getByTestId("sideBarElectronicsLink");
  //   const homeLink = getByTestId("sideBarHomeLink");
  //   const healthFitnessLink = getByTestId("sideBarHealth & FitnessLink");
  //   fireEvent.click(electronicsLink);
  //
  //   const routersSubLink = getByTestId("subLinkRouters");
  //   const routersSubLink = getByTestId("subLinkBedroom");
  //   const routersSubLink = getByTestId("subLinkAll Health & Fitness");
  //   fireEvent.click(routersSubLink);
  //   fireEvent.click(routersSubLink);
  //
  //   expect(getByTestId("subLinkRoutersPage")).toBeInTheDocument();
  // });

  it("should open & close the dropdown when clicking on a link", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const link = getByTestId("navLinkHealth & Fitness");
    fireEvent.mouseOver(link);
    const subLink = getByTestId("subLinkAll Health & Fitness");
    fireEvent.click(subLink);

    // wait(() => expect(getByText("subLinksPage")).toBeVisible());
    expect(getByTestId("subLinkAll Health & FitnessPage")).toBeVisible();
  });
});

it("landing on a bad page shows 404 page", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByTestId("404")).toBeInTheDocument();
});
