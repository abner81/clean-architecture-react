import { RequiredFieldError } from "../../errors";
import { RequiredFieldValidaton } from "./required-field-validation";
import faker from "faker";

const makeSut = (): RequiredFieldValidaton => {
  const sut = new RequiredFieldValidaton("email");
  return sut;
};

describe("RequiredFieldValidation", () => {
  test("should return error if field is empty ", () => {
    const sut = makeSut();
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });

  test("should return falsy if field is not empty ", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
});
