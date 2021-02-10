import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "../../protocols/field-validation";

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return new InvalidFieldError();
  }
}