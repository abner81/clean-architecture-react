describe("Login", () => {
  beforeEach(() => cy.visit("login"));
  it("should load with correct inital state", () => {
    cy.getByTestId("email-status").should(
      "have.attr",
      "title",
      "Campo Obrigatório"
    );
  });
});
