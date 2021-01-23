import { FieldValidation } from "../../protocols/field-validation";
import { RequiredFieldValidaton } from "@/validation/validators";

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

  build(): FieldValidation[] {
    return this.validations;
  }
}
