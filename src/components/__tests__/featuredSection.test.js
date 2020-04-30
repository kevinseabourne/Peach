import React from "react";
import FeaturedSection from "../featuredSection";
import { render, wait, act } from "@testing-library/react";
import { getAllArticles, data } from "../services/articleService";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("../services/articleService");

beforeEach(() => jest.resetModules());

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("Featured Section", () => {
  it("renders data from mocked axios call and when the component unmounts the http request is canceled", async () => {
    getAllArticles.mockResolvedValue({ data: data });

    const { unmount, getByTestId, getAllByRole } = render(<FeaturedSection />);

    expect(getAllArticles).toHaveBeenCalledTimes(1);
    expect(getAllArticles).toHaveBeenCalledWith();

    await wait(() => expect(getAllByRole("article")).toHaveLength(2));

    await wait(() =>
      expect(
        getByTestId("Top 5 Best Routers 2020 Mock Container")
      ).toBeInTheDocument()
    );

    unmount();
    expect(getAllArticles).toHaveBeenCalledTimes(2);
    expect(getAllArticles).toHaveBeenCalledWith("cancel");
  });

  it("should show an error message", async () => {
    getAllArticles.mockImplementation(() =>
      Promise.reject("Async error").catch(error => {
        expect(error).toEqual("Async error");
      })
    );

    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <FeaturedSection />
      </Router>
    );

    expect(getAllArticles).toHaveBeenCalledTimes(1);
    expect(getAllArticles).toHaveBeenCalledWith();

    act(() => jest.advanceTimersByTime(1000));

    await wait(() => expect(getByTestId("loading")).toBeInTheDocument());
  });
});
