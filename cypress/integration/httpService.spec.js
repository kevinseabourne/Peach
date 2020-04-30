describe("Failed Request", () => {
  it("should show an error message", () => {
    cy.server({ force404: true });
    cy.visit("http://localhost:3001");

    const loadingContainer = cy.findByRole("alert");

    // assertions
    loadingContainer.should("be.visible");
  });
});
