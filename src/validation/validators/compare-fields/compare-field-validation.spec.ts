import { InvalidFieldError } from "@/validation/errors";
import { CompareFieldsValidation } from "./compare-field-validation";
import faker from "faker";

const makeSut = (valueToCompare: string): CompareFieldsValidation => {
  const sut = new CompareFieldsValidation(
    faker.database.column(),
    valueToCompare
  );
  return sut;
};

describe("CompareFieldsValidation", () => {
  test("should return error if compare is invalid ", () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if field is not empty ", () => {
    const valueToCompare = faker.random.word();
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
