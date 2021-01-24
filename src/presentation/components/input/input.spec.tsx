import React from "react";
import Input from "./input";
import Context from "@/presentation/contexts/form/form-context";
import { render } from "@testing-library/react";

describe("Input Component", () => {
  test("should begin with readonly", () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="any_field" />
      </Context.Provider>
    );
    const input = getByTestId("any_field") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
