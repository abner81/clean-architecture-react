import { RequiredFieldValidaton } from "@/validation/validators";
import { ValidationBuilder as sut } from "./validation-builder";

describe("ValidationBuilder", () => {
  test("should return RequiredFieldValidation", () => {
    const validations = sut.field("any_field").required().build();
    expect(validations).toEqual([new RequiredFieldValidaton("any_field")]);
  });
});
