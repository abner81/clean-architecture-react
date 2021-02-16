import React from "react";
import { render, RenderResult } from "@testing-library/react";
import SignUp from "./signup";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />);
  return { sut };
};

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldname: string,
  isDisable: boolean
): void => {
  const button = sut.getByTestId(fieldname) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
};

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || "Tudo certo!");
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("SignUp Component", () => {
  test("Should start with initial state", () => {
    const validationError = "Campo Obrigatório";
    const { sut } = makeSut();
    testChildCount(sut, "error-wrap", 0);
    testButtonIsDisabled(sut, "submit", true);
    testStatusForField(sut, "email", validationError);
    testStatusForField(sut, "password", validationError);
    testStatusForField(sut, "name", validationError);
    testStatusForField(sut, "passwordConfirmation", validationError);
  });
});
