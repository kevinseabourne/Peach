describe("Carousel onLoad Images", () => {
  it("should show place holder content while images are loading", () => {
    cy.visit("http://localhost:3001");

    const loadingContainer = cy.findByTestId(
      "Top 5 Best Routers 2020 content Loading"
    );

    // assertions
    loadingContainer.should("be.visible");
  });

  it("should show the first article & have the correct amount of articles in the DOM when loaded", () => {
    cy.visit("http://localhost:3001");

    const loadingContainer = cy.findByTestId(
      "Top 5 Best Routers 2020 content Loaded"
    );

    const articles = cy.findAllByRole("article");

    // assertions
    articles.should("have.length", 2);
    loadingContainer.should("be.visible");
  });
});

describe("Carousel Featured Articles length & Order", () => {
  it("should show place holder content while images are loading", () => {
    cy.visit("http://localhost:3001");

    const loadingContainer = cy.findByTestId(
      "Top 5 Best Routers 2020 content Loading"
    );

    // assertions
    loadingContainer.should("be.visible");
  });

  it("should show images when loaded", () => {
    cy.visit("http://localhost:3001");

    const loadingContainer = cy.findByTestId(
      "Top 5 Best Routers 2020 content Loaded"
    );

    // assertions
    loadingContainer.should("be.visible");
  });
});

describe("Carousel Pagination", () => {
  it("Clicking the coresponding pagination dot with the article should show that article", () => {
    cy.visit("http://localhost:3001");

    const vpnArticleNumber = cy.findByTestId(
      "Top 5 Best VPNs 2020 article-number"
    );
    const vpnArticleInfo = cy.findByTestId("Top 5 Best VPNs 2020 Container");
    const vpnArticleImage = cy.findByTestId(
      "Top 5 Best VPNs 2020 background-image"
    );
    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );
    const VPNsPaginationDot = cy.findByTestId(
      "Top 5 Best VPNs 2020pagination-dot"
    );
    const routersPaginationDot = cy.findByTestId(
      "Top 5 Best Routers 2020pagination-dot"
    );

    // VPN article - pagination dot
    VPNsPaginationDot.click();

    // assertions
    vpnArticleNumber.should("be.visible");
    vpnArticleInfo.should("be.visible");
    vpnArticleImage.should("be.visible");

    // -------------------------------------------------------------------------------------------

    // Routers article - pagination dot
    routersPaginationDot.click();

    // assertions
    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");
  });
});

describe("Carousel Swiping", () => {
  it("should show the first article, then swipe right to the next article", () => {
    cy.visit("http://localhost:3001");

    const vpnArticleNumber = cy.findByTestId(
      "Top 5 Best VPNs 2020 article-number"
    );
    const vpnArticleInfo = cy.findByTestId("Top 5 Best VPNs 2020 Container");
    const vpnArticleImage = cy.findByTestId(
      "Top 5 Best VPNs 2020 background-image"
    );
    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 500,
        pageY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mouseup", {
        which: 1,
        pageX: 1200,
        pageY: 630
      });

    // assertions
    vpnArticleNumber.should("be.visible");
    vpnArticleInfo.should("be.visible");
    vpnArticleImage.should("be.visible");
  });

  it("should show the first article, then swipe left and show the last article", () => {
    cy.visit("http://localhost:3001");

    const vpnArticleNumber = cy.findByTestId(
      "Top 5 Best VPNs 2020 article-number"
    );
    const vpnArticleInfo = cy.findByTestId("Top 5 Best VPNs 2020 Container");
    const vpnArticleImage = cy.findByTestId(
      "Top 5 Best VPNs 2020 background-image"
    );
    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 600,
        pageY: 630
      })
      .trigger("mouseup", {
        which: 1,
        pageX: 600,
        pageY: 630
      });

    // assertions
    vpnArticleNumber.should("be.visible");
    vpnArticleInfo.should("be.visible");
    vpnArticleImage.should("be.visible");
  });

  it("should show the first article, swipe right to the next article then left back to the previous article", () => {
    cy.visit("http://localhost:3001");

    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 500,
        pageY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mouseup", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mousedown", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mouseup", {
        which: 1,
        pageX: 500,
        pageY: 630
      });

    // assertions

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");
  });

  it("should switch back and show the first article when swiping right on the last article", () => {
    cy.visit("http://localhost:3001");

    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 500,
        pageY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mouseup", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mousedown", {
        which: 1,
        pageX: 500,
        pageY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 1200,
        pageY: 630
      })
      .trigger("mouseup", {
        which: 1,
        pageX: 1200,
        pageY: 630
      });

    // assertions
    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");
  });

  it("should stay on the current article if your right swipe is not longer than 25% of the container's length", () => {
    cy.visit("http://localhost:3001");

    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 500,
        pageY: 630,
        clientX: 500,
        clientY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 600,
        pageY: 630,
        clientX: 600,
        clientY: 630
      })
      .trigger("mouseup", {
        which: 1,
        pageX: 600,
        pageY: 630,
        clientX: 600,
        clientY: 630
      });

    // assertions
    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");
  });

  it("should stay on the current article if your left swipe is not longer than 25% of the container's length", () => {
    cy.visit("http://localhost:3001");

    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 500,
        pageY: 630,
        clientX: 500,
        clientY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 400,
        pageY: 630,
        clientX: 600,
        clientY: 630
      })
      .trigger("mouseup", {
        which: 1,
        pageX: 400,
        pageY: 630,
        clientX: 600,
        clientY: 630
      });

    // assertions
    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");
  });

  it("should stay on the current article if your left swipe is not longer than 25% of the container's length and you have dragged outsite the container", () => {
    cy.visit("http://localhost:3001");

    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 500,
        pageY: 630,
        clientX: 500,
        clientY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 800,
        pageY: 800,
        clientX: 600,
        clientY: 800
      })
      .trigger("mouseleave", {
        which: 1,
        pageX: 800,
        pageY: 1000,
        clientX: 600,
        clientY: 1000
      });

    // assertions
    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");
  });

  it("should stay on the current article if your right swipe is not longer than 25% of the container's length and you have dragged outsite the container", () => {
    cy.visit("http://localhost:3001");

    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 800,
        pageY: 630,
        clientX: 800,
        clientY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 500,
        pageY: 800,
        clientX: 500,
        clientY: 800
      })
      .trigger("mouseleave", {
        which: 1,
        pageX: 400,
        pageY: 1000,
        clientX: 400,
        clientY: 1000
      });

    // assertions
    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");
  });

  it("should swipe to the next article if your left swipe is longer than 25% of the container's length and you have dragged outsite the container", () => {
    cy.visit("http://localhost:3001");

    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );
    const vpnArticleNumber = cy.findByTestId(
      "Top 5 Best VPNs 2020 article-number"
    );
    const vpnArticleInfo = cy.findByTestId("Top 5 Best VPNs 2020 Container");
    const vpnArticleImage = cy.findByTestId(
      "Top 5 Best VPNs 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 500,
        pageY: 630,
        clientX: 500,
        clientY: 630
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 800,
        pageY: 1200,
        clientX: 1200,
        clientY: 800
      })
      .trigger("mouseleave", {
        which: 1,
        pageX: 1400,
        pageY: 1000,
        clientX: 1400,
        clientY: 1000
      });

    // assertions
    vpnArticleNumber.should("be.visible");
    vpnArticleInfo.should("be.visible");
    vpnArticleImage.should("be.visible");
  });

  it("should swipe to the last article (starting from the first) if your right swipe is longer than 25% of the container's length and you have dragged outsite the container", () => {
    cy.visit("http://localhost:3001");

    const routersArticleNumber = cy.findByTestId(
      "Top 5 Best Routers 2020 article-number"
    );
    const routersArticleInfo = cy.findByTestId(
      "Top 5 Best Routers 2020 Container"
    );
    const routersArticleImage = cy.findByTestId(
      "Top 5 Best Routers 2020 background-image"
    );
    const vpnArticleNumber = cy.findByTestId(
      "Top 5 Best VPNs 2020 article-number"
    );
    const vpnArticleInfo = cy.findByTestId("Top 5 Best VPNs 2020 Container");
    const vpnArticleImage = cy.findByTestId(
      "Top 5 Best VPNs 2020 background-image"
    );

    routersArticleNumber.should("be.visible");
    routersArticleInfo.should("be.visible");
    routersArticleImage.should("be.visible");

    // dragging
    cy.findByTestId("carousel-container")
      .trigger("mousedown", {
        which: 1,
        pageX: 1200,
        pageY: 600,
        clientX: 1200,
        clientY: 600
      })
      .trigger("mousemove", {
        which: 1,
        pageX: 800,
        pageY: 600,
        clientX: 600,
        clientY: 600
      })
      .trigger("mouseleave", {
        which: 1,
        pageX: 500,
        pageY: 1000,
        clientX: 500,
        clientY: 1000
      });

    // assertions
    vpnArticleNumber.should("be.visible");
    vpnArticleInfo.should("be.visible");
    vpnArticleImage.should("be.visible");
  });
});
