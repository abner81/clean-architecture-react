import { RemoteAddAccount } from "./remote-add-account";
import { HttpPostClientSpy } from "@/data/test";
import faker from "faker";
import { AddAccountParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { mockAccountModel, mockAddAccountParams } from "@/domain/test";
import { HttpStatusCode } from "@/data/protocols/http";
import { EmailInUseError, UnexpectedError } from "@/domain/errros";

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};
describe("RemoteAddAccount", () => {
  test("Shoud call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Shoud call HttpPostClient with correct BODY", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test("Shoud throw EmailInUseError if HttpPostClient returns 403", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test("Shoud throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Shoud throw UnexpectedError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Shoud throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Shoud return an AccountModel if HttpPostClient returns 200", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResponse = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponse,
    };
    const response = await sut.add(mockAddAccountParams());
    expect(response).toEqual(httpResponse);
  });
});
