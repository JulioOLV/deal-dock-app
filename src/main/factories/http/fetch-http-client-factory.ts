import { FetchHttpClient } from "@/infra/http/fetch-http-client/fetch-http-client";

export const makeFetchHttpClient = (): FetchHttpClient => {
  return new FetchHttpClient();
};
