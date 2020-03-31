import React from "react";
import SliderSection from "./sliderSection";
import { render, fireEvent, wait } from "@testing-library/react";
import { configure } from "@testing-library/cypress";

describe("slider", () => {
  it("Clicking the coresponding pagination dot with the article should show that article", async () => {
    const { getByTestId } = render(<SliderSection />);
    const vpnArticleNumber = getByTestId("Top 5 Best VPNs 2020 article-number");
    const vpnArticleInfo = getByTestId("Top 5 Best VPNs 2020 Container");
    const vpnArticleImage = getByTestId(
      "Top 5 Best VPNs 2020 background-image"
    );
    const routersArticleNumber = getByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = getByTestId("Top 5 Best Routers 2020 Container");
    const routersArticleImage = getByTestId(
      "Top 5 Best Routers 2020 background-image"
    );
    const VPNsPaginationDot = getByTestId("Top 5 Best VPNs 2020pagination-dot");
    const routersPaginationDot = getByTestId(
      "Top 5 Best Routers 2020pagination-dot"
    );

    // VPN article - pagination dot
    fireEvent.click(VPNsPaginationDot);

    // assetions
    expect(vpnArticleNumber).toBeVisible();
    expect(vpnArticleInfo).toBeVisible();
    expect(vpnArticleImage).toBeVisible();

    // -------------------------------------------------------------------------------------------

    // Routers article - pagination dot
    fireEvent.click(routersPaginationDot);

    // assertion
    expect(routersArticleNumber).toBeVisible();
    expect(routersArticleInfo).toBeVisible();
    expect(routersArticleImage).toBeVisible();
  });
});

// describe("carousel swiping", () => {
// it("should change to the next article when clicking and dragging the mouse 25% the length of the container then releasing the click", async () => {
// const { container, getByTestId } = render(<SliderSection />);

// const mousedown = new MouseEvent("mousedown", {
//   bubbles: true,
//   cancelable: true
// });

// Object.defineProperty(mousedown, "clientX", { get: () => 900 });
// Object.defineProperty(mousedown, "clientY", { get: () => 630 });
// Object.defineProperty(mousedown, "target", { offsetLeft: 490 });
// Object.defineProperty(mousedown, "target", {
//   offsetLeft: { get: () => 490 }
// });
//
// fireEvent(getByTestId("carousel-container"), mousedown);

// fireEvent.mouseDown(getByTestId("carousel-container"), {
//   clientX: 800,
//   clientY: 630
// });
//
// fireEvent.mouseMove(getByTestId("carousel-container"), {
//   clientX: 1200,
//   clientY: 630
// });
// fireEvent.mouseUp(getByTestId("carousel-container"), {
//   clientX: 1200,
//   clientY: 630
// });
//
// console.log(container.innerHTML);
//
// // assertion
// expect(getByTestId("Top 5 best VPNs 2020 Container")).toBeVisible();
// });
// });
