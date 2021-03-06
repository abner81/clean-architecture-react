import {
  ValidationBuilder,
  ValidationComposite,
} from "@/validation/validators";
import { makeSignUpValidation } from "./signup-validation-factory";

describe("SignUpValidationFactory", () => {
  test("should make ValidationCompositeFactory with correct validations", () => {
    const sut = makeSignUpValidation();
    expect(sut).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("name").required().min(5).build(),
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().min(5).build(),
        ...ValidationBuilder.field("passwordConfirmation")
          .required()
          .sameAs("password")
          .build(),
      ])
    );
  });
});
