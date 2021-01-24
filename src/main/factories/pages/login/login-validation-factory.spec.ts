import {
  ValidationBuilder,
  ValidationComposite,
} from "@/validation/validators";
import { makeLoginValidation } from "./login-validation-factory";

describe("LoginValidationFactory", () => {
  test("should make ValidationCompositeFactory with correct validations", () => {
    const sut = makeLoginValidation();
    expect(sut).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("email").email().required().build(),
        ...ValidationBuilder.field("password").required().min(5).build(),
      ])
    );
  });
});
