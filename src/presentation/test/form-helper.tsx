import { fireEvent, RenderResult } from "@testing-library/react";
import faker from "faker";

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldname: string,
  isDisable: boolean
): void => {
  const button = sut.getByTestId(fieldname) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
};

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError: string = ""
): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(fieldName);
  const label = sut.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute("data-status")).toBe(
    validationError ? "invalid" : "valid"
  );
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, {
    target: { value },
  });
};

export const testElementExists = (
  sut: RenderResult,
  fieldname: string
): void => {
  const element = sut.getByTestId(fieldname);
  expect(element).toBeTruthy();
};

export const testElementText = (
  sut: RenderResult,
  fieldname: string,
  text: string
): void => {
  const element = sut.getByTestId(fieldname);
  expect(element.textContent).toEqual(text);
};
