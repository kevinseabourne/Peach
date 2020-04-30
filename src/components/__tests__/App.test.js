import React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import App from "../../App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

test("App component renders", () => {
  const history = createMemoryHistory();
  const { container } = render(
    <Router history={history}>
      <App />
    </Router>
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
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const link = getByTestId("navBarElectronicsLink");
    fireEvent.mouseOver(link);
    const subLink = getByTestId("subLinkVPNs");
    fireEvent.click(subLink);

    await wait(() => expect(getByTestId("VPNsArticlesPage")).toBeVisible());
  });

  it("should open & close the dropdown when clicking on a link", async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const link = getByTestId("navBarHomeLink");
    fireEvent.mouseOver(link);
    const subLink = getByTestId("subLinkBedroom");
    fireEvent.click(subLink);

    await wait(() => expect(getByTestId("BedroomArticlesPage")).toBeVisible());
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

    expect(getByTestId(`${expected}ArticlesPage`)).toBeInTheDocument();
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
    fireResize(500);
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const link = getByTestId("navBarHealth & FitnessLink");
    fireEvent.mouseOver(link);
    const subLink = getByTestId("subLinkAll Health & Fitness");
    fireEvent.click(subLink);

    expect(getByTestId("All Health & FitnessArticlesPage")).toBeVisible();
  });
});

it("should redirect you to the 404 page when writing in a address that does not exist", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByTestId("404")).toBeInTheDocument();
});
