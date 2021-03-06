import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import faker from "faker";
import { HttpPostParams } from "@/data/protocols/http";
import { mockAxios, mockHttpResponse } from "@/infra/test";
import { mockPostRequest } from "@/data/test";

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

  test("Should return correct statusCode and body on failure", async () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const request = mockPostRequest();
    const promise = sut.post(request);
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
