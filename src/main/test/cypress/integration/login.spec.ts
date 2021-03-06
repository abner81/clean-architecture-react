describe("Login", () => {
  beforeEach(() => cy.visit("login"));
  it("should load with correct inital state", () => {
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo Obrigatório")
      .should("contain.text", "🔴");
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo Obrigatório")
      .should("contain.text", "🔴");

    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });
});