import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import Login from "./login";
import { ValidationSpy } from "@/presentation/test";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationSpy} />);
  return { sut, validationSpy };
};

describe("Login Component", () => {
  afterEach(cleanup);

  test("Should start with initial state", () => {
    const { sut, validationSpy } = makeSut();
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Campo Obrigatório");
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should call Validaton with correct email", () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId("email");
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fieldValue).toBe(email);
    expect(validationSpy.fieldName).toBe("email");
  });

  test("Should call Validaton with correct password", () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId("password");
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fieldValue).toBe(password);
    expect(validationSpy.fieldName).toBe("password");
  });

  test("Should show email error if Validation fails", () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId("email");
    const emailStatus = sut.getByTestId("email-status");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
  });
});
