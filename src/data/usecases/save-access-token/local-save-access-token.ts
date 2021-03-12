import { SetStorage } from "@/data/protocols/cache/set-storage";
import { UnexpectedError } from "@/domain/errros";
import { SaveAccessToken } from "@/domain/usecases/save-access-token";

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    if (!accessToken) throw new UnexpectedError();

    return await this.setStorage.set("accessToken", accessToken);
  }
}
