import faker from "faker";

const baseUrl: string = Cypress.config().baseUrl;
describe("Login", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("login");
  });
  it("should load with correct inital state", () => {
    cy.getByTestId("email").should("have.attr", "readOnly");
    cy.getByTestId("password").should("have.attr", "readOnly");

    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo Obrigatório")
      .should("contain.text", "🔴");
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo Obrigatório")
      .should("contain.text", "🔴");

    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });
  it("should present error state if form is invalid", () => {
    cy.getByTestId("email").focus().type(faker.random.word());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Valor inválido")
      .should("contain.text", "🔴");

    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(3));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Valor inválido")
      .should("contain.text", "🔴");

    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });
  it("should present error if invalid credentials are provided", () => {
    cy.route({
      method: "POST",
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words(),
      },
    });
    cy.getByTestId("email").focus().type(faker.internet.email());
    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId("submit").click();
    cy.getByTestId("spinner").should("not.exist");
    cy.getByTestId("main-error").should(
      "contain.text",
      "Credenciais inválidas"
    );
    cy.url().should("eq", `${baseUrl}/login`);
  });
  it("should save accessToken if valid credentials are provided", () => {
    cy.route({
      method: "POST",
      url: /login/,
      status: 200,
      response: {
        ssx: faker.random.uuid(),
      },
    });
    cy.getByTestId("email").focus().type("mango@gmail.com");
    cy.getByTestId("password").focus().type("12345");
    cy.getByTestId("submit").click();
    cy.getByTestId("main-error").should("not.exist");
    cy.getByTestId("spinner").should("not.exist");
    cy.url().should("eq", `${baseUrl}/`);
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem("accessToken"))
    );
  });
});
