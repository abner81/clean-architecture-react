import { InvalidFieldError } from "@/validation/errors";
import { CompareFieldsValidation } from "./compare-field-validation";
import faker from "faker";

const makeSut = (): CompareFieldsValidation => {
  const sut = new CompareFieldsValidation(faker.database.column());
  return sut;
};

describe("CompareFieldsValidation", () => {
  test("should return error if compare is invalid ", () => {
    const sut = makeSut();
    const error = sut.validate("");
    expect(error).toEqual(new InvalidFieldError());
  });
});
