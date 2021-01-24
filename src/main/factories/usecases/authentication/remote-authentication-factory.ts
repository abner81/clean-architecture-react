import { RemoteAuthentication } from "@/data/usecases/authentication/Remote-authentication";
import { Authentication } from "@/domain/usecases";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";
import { makeApiUrl } from "../../http/api-url";

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl("/login"), makeAxiosHttpClient());
};
