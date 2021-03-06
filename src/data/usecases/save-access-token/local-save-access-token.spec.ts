import { SetStorageMock } from "@/data/test/mock-cache";
import { LocalSaveAccessToken } from "./local-save-access-token";
import faker from "faker";
import { UnexpectedError } from "@/domain/errros";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe("LocalSaveAccessToken", () => {
  test("should call SetStorag with correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });

  test("should throw if SetStorag throws", async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.random.uuid());
    await expect(promise).rejects.toThrow(new Error());
  });
  test("should throw if accessToken falsy", async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
