import faker from "faker";
import * as FormHelper from "../support/form-helper";
import * as Http from "../support/login-mocks";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("signup");
  });
  it("should load with correct inital state", () => {
    FormHelper.testInputStatus("name", "Campo Obrigatório");
    cy.getByTestId("name").should("have.attr", "readOnly");

    FormHelper.testInputStatus("email", "Campo Obrigatório");
    cy.getByTestId("email").should("have.attr", "readOnly");

    FormHelper.testInputStatus("password", "Campo Obrigatório");
    cy.getByTestId("password").should("have.attr", "readOnly");
    FormHelper.testInputStatus("passwordConfirmation", "Campo Obrigatório");
    cy.getByTestId("passwordConfirmation").should("have.attr", "readOnly");

    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("should present error state if form is invalid", () => {
    cy.getByTestId("name").focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus("name", "Valor inválido");

    cy.getByTestId("email").focus().type(faker.random.word());
    FormHelper.testInputStatus("email", "Valor inválido");

    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus("password", "Valor inválido");

    cy.getByTestId("passwordConfirmation")
      .focus()
      .type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus("passwordConfirmation", "Valor inválido");

    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });
});
