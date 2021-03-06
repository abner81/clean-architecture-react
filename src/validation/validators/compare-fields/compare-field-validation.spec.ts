import { InvalidFieldError } from "@/validation/errors";
import { CompareFieldsValidation } from "./compare-field-validation";
import faker from "faker";

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation => {
  const sut = new CompareFieldsValidation(field, fieldToCompare);
  return sut;
};

describe("CompareFieldsValidation", () => {
  test("should return error if compare is invalid ", () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word(),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if field is not empty ", () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
