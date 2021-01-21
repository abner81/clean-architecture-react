import { RequiredFieldError } from "../errors";
import { RequiredFieldValidaton } from "./required-field-validation";

describe("RequiredFieldValidation", () => {
  test("should return error if field is empty ", () => {
    const sut = new RequiredFieldValidaton("email");
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });
});
