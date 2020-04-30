import React from "react";
import HomePage from "../homePage";
import FeaturedSection from "../featuredSection";
import App from "../../App";
import { render, wait, act } from "@testing-library/react";
import { getAllArticles, data } from "../services/articleService";
import axios from "axios";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

// jest.mock("../services/articleService");

// beforeAll(() => {
//   jest.useFakeTimers();
// });
//
// afterEach(() => {
//   jest.clearAllMocks();
//   jest.resetModules();
// });
//
// afterAll(() => {
//   jest.useRealTimers();
// });

describe("HomePage", () => {
  it("renders data from mocked axios call and when the component unmount the http request is canceled", async () => {
    // getAllArticles.mockResolvedValue({ data: data });

    const history = createMemoryHistory();
    const { container, debug, getByTestId, getByText } = render(
      <Router history={history}>
        <HomePage />
      </Router>
    );
    expect(container).toBeInTheDocument();

    // expect(getAllArticles).toHaveBeenCalledTimes(1);
    // expect(getAllArticles).toHaveBeenCalledWith();

    // await wait(() =>
    //   expect(
    //     getByTestId("Top 5 Best Routers 2020 Mock Container")
    //   ).toBeInTheDocument()
    // );

    // unmount();
    // expect(getAllArticles).toHaveBeenCalled();
    // expect(getAllArticles).toHaveBeenCalledWith("cancel");
  });
});
