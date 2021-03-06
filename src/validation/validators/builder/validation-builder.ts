import { FieldValidation } from "../../protocols/field-validation";
import { RequiredFieldValidaton } from "@/validation/validators";
import { EmailValidation } from "../email/email-validation";
import { MinLengthValidation } from "../min-length/min-length-validation";
import { CompareFieldsValidation } from "../compare-fields/compare-field-validation";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidaton(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    );
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
