import { RequiredFieldError } from "../../errors";
import { FieldValidation } from "../../protocols/field-validation";

export class RequiredFieldValidaton implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return value ? null : new RequiredFieldError();
  }
}
