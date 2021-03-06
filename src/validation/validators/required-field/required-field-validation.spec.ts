import { RequiredFieldError } from "../../errors";
import { RequiredFieldValidaton } from "./required-field-validation";
import faker from "faker";

const makeSut = (field: string): RequiredFieldValidaton => {
  const sut = new RequiredFieldValidaton(field);
  return sut;
};

describe("RequiredFieldValidation", () => {
  test("should return error if field is empty ", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: "" });
    expect(error).toEqual(new RequiredFieldError());
  });

  test("should return falsy if field is not empty ", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
