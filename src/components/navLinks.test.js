import React from "react";
import NavLinks from "./navLinks";
import { render, fireEvent, wait } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("header links", () => {
  it("should open & close the dropdown when clicking on a link", async () => {
    const history = createMemoryHistory();
    const { container, getByTestId, queryByTestId, getByText } = render(
      <Router history={history}>
        <NavLinks />
      </Router>
    );
    const link = getByText("Electronics");
    fireEvent.mouseOver(link);
    const subLink = getByText("VPNs");
    fireEvent.click(subLink);

    // wait(() => expect(getByText("subLinksPage")).toBeVisible());
    await wait(() =>
      expect(history.location.pathname).toBe("/electronics/vpns")
    );
  });
});

// describe("react router", () => {
//   test.each([["home", "/"], ["about", "/about"], ["contact", "/contact"]])(
//     "test",
//     (linkName, expected) => {
//       const history = createMemoryHistory();
//       const { container, getByTestId, queryByTestId, getByText } = render(
//         <Router history={history}>
//           <NavLinks />
//         </Router>
//       );
//       const link = getByText("Electronics");
//       fireEvent.mouseOver(link);
//       console.log(container.innerHTML);
//     }
//   );
// });
