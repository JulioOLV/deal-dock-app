import { FetchHttpClient } from "@/infra/http/fetch-http-client/fetch-http-client";

export const makeFetchHttpClient = (accessToken?: string): FetchHttpClient => {
  return new FetchHttpClient(accessToken);
};
