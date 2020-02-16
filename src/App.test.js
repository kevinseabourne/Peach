import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("App component renders", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});