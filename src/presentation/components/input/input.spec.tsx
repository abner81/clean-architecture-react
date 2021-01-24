import React from "react";
import Input from "./input";
import Context from "@/presentation/contexts/form/form-context";
import { render, RenderResult } from "@testing-library/react";

const makeSut = (): RenderResult =>
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name="any_field" />
    </Context.Provider>
  );

describe("Input Component", () => {
  test("should begin with readonly", () => {
    const sut = makeSut();
    const input = sut.getByTestId("any_field") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
