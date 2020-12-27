import { AuthenticationParams } from "domain/usecases/Authentication";
import faker from "faker";
import { AccountModel } from "../models/AccountModel";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
