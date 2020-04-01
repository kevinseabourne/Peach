describe("carousel swiping", () => {
  it("should show the first article, then swipe right to the next article", () => {
    cy.visit("http://localhost:3000");

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");
    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );

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
    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best VPNs 2020 Container").should("be.visible");

    cy.findByTestId("Top 5 Best VPNs 2020 background-image").should(
      "be.visible"
    );
  });

  it("should show the first article, then swipe left and show the last article", () => {
    cy.visit("http://localhost:3000");

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );

    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");

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
    cy.findByTestId("Top 5 Best VPNs 2020 article-number").should("be.visible");
    cy.findByTestId("Top 5 Best VPNs 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best VPNs 2020 Container").should("be.visible");
  });

  it("should show the first article, swipe right to the next article then left back to the previous article", () => {
    cy.visit("http://localhost:3000");

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );

    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");

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

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");
  });

  it("should switch back and show the first article when swiping right on the last article", () => {
    cy.visit("http://localhost:3000");

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );

    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");

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
    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");
  });

  it("should stay on the current article if your right swipe is not longer than 25% of the container's length", () => {
    cy.visit("http://localhost:3000");

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");

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

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );

    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");
  });

  it("should stay on the current article if your left swipe is not longer than 25% of the container's length", () => {
    cy.visit("http://localhost:3000");

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );

    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");

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
    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");
  });

  it("should stay on the current article if your left swipe is not longer than 25% of the container's length and you have dragged outsite the container", () => {
    cy.visit("http://localhost:3000");

    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );

    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");

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
    cy.findByTestId("Top 5 Best Routers 2020 article-number").should(
      "be.visible"
    );

    cy.findByTestId("Top 5 Best Routers 2020 background-image").should(
      "be.visible"
    );
    cy.findByTestId("Top 5 Best Routers 2020 Container").should("be.visible");
  });
});
