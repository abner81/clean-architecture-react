import React from "react";
import Input from "./input";
import Context from "@/presentation/contexts/form/form-context";
import faker from "faker";
import { fireEvent, render, RenderResult } from "@testing-library/react";

const makeSut = (fieldName: string): RenderResult =>
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  );

describe("Input Component", () => {
  test("should begin with readonly", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test("should remove readonly o focus", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test("should focus input on label click", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field);
    const label = sut.getByTestId(`${field}-label`);
    fireEvent.click(label);
    expect(document.activeElement).toBe(input);
  });
});
