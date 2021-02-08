import { AccountModel } from "../models/AccountModel";

export type AddAccountParams = {
  email: string;
  password: string;
  confirmationPassword: string;
  name: string;
};

export interface Authentication {
  add(params: AddAccountParams): Promise<AccountModel>;
}
