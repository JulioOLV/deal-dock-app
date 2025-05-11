import { makeApiUrl } from "../http/api-url-factory";
import { makeFetchHttpClient } from "../http/fetch-http-client-factory";
import { RefreshToken } from "@/data/usecases/authentication/refresh-token";

export const makeRefreshTokenUseCase = () => {
  const fetchHttpClient = makeFetchHttpClient();
  const apiUrl = makeApiUrl(`/oauth/token`);
  return new RefreshToken(apiUrl, fetchHttpClient);
};
