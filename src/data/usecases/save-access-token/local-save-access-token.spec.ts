import { SetStorageSpy } from "@/data/test/mock-storage";
import { LocalSaveAccessToken } from "./local-save-access-token";
import faker from "faker";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);
  return {
    sut,
    setStorageSpy,
  };
};

describe("LocalSaveAccessToken", () => {
  test("should call SetStorag with correct value", async () => {
    const { sut, setStorageSpy } = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe("accessToken");
    expect(setStorageSpy.value).toBe(accessToken);
  });

  test("should throw if SetStorag throws", async () => {
    const { sut, setStorageSpy } = makeSut();
    jest.spyOn(setStorageSpy, "set").mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.random.uuid());
    await expect(promise).rejects.toThrow(new Error());
  });
});
