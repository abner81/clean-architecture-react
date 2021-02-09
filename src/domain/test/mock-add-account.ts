import { AuthenticationParams } from "domain/usecases/Authentication";
import faker from "faker";
import { AddAccountParams } from "../usecases";

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    confirmationPassword: password,
  };
};