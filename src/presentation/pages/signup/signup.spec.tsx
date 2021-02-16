import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import SignUp from "./signup";
import { AddAccountSpy, Helper, ValidationStub } from "@/presentation/test";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const addAccountSpy = new AddAccountSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <SignUp validation={validationStub} addAccount={addAccountSpy} />
  );
  return { sut, addAccountSpy };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, "email", email);
  Helper.populateField(sut, "password", password);
  Helper.populateField(sut, "name", name);
  Helper.populateField(sut, "passwordConfirmation", password);
  const form = sut.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe("SignUp Component", () => {
  afterEach(cleanup);
  test("Should start with initial state", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, "error-wrap", 0);
    Helper.testButtonIsDisabled(sut, "submit", true);
    Helper.testStatusForField(sut, "email", validationError);
    Helper.testStatusForField(sut, "password", validationError);
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
    Helper.testStatusForField(sut, "name", validationError);
  });

  test("Should show name error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name", validationError);
  });
  test("Should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "email");
    Helper.testStatusForField(sut, "email", validationError);
  });
  test("Should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "password");
    Helper.testStatusForField(sut, "password", validationError);
  });
  test("Should show passwordConfirmation error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testStatusForField(sut, "passwordConfirmation", validationError);
  });

  test("Should show valid name state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "name");
    Helper.testStatusForField(sut, "name");
  });
  test("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "email");
    Helper.testStatusForField(sut, "email");
  });
  test("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "password");
    Helper.testStatusForField(sut, "password");
  });
  test("Should show valid passwordConfirmation state if Validation succeeds", () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testStatusForField(sut, "passwordConfirmation");
  });

  test("Should enable submit button if form is valid", async () => {
    const { sut } = makeSut();
    Helper.populateField(sut, "email");
    Helper.populateField(sut, "password");
    Helper.populateField(sut, "name");
    Helper.populateField(sut, "passwordConfirmation");
    Helper.testButtonIsDisabled(sut, "submit", false);
  });

  test("Should show spinner on submit", async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    Helper.testElementExists(sut, "spinner");
  });

  test("Should call AddAccount with correct values", async () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, name, email, password);
    expect(addAccountSpy.params).toEqual({
      email,
      password,
      passwordConfirmation: password,
      name,
    });
  });
});
