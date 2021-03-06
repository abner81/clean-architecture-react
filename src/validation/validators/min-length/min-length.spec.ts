import { InvalidFieldError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";
import faker from "faker";

const makeSut = (field): MinLengthValidation =>
  new MinLengthValidation(field, 5);

describe("MinLengthValidation", () => {
  test("should return error if value is invalid", () => {
    const field = faker.random.word();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });
    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return false if value is valid", () => {
    const field = faker.random.word();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });
    expect(error).toBeFalsy();
  });

  test("should return false if field does not exists in schema", () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate({
      [faker.random.word()]: faker.random.alphaNumeric(5),
    });
    expect(error).toBeFalsy();
  });
});
