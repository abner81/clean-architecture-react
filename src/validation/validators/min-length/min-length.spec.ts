import { InvalidFieldError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";
import faker from "faker";

const makeSut = (): MinLengthValidation =>
  new MinLengthValidation(faker.random.word(), 5);

describe("MinLengthValidation", () => {
  test("should return error if value is invalid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(4));
    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return false if value is valid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});