import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import faker from "faker";
import { HttpPostParams } from "@/data/protocols/http";
import { mockAxios } from "@/infra/test";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values", async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should return correct statusCode and body", async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockPostRequest();
    const promise = sut.post(request);
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
