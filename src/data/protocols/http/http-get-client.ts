import { HttpResponse } from ".";

export type HttpGetParams = {
  url: string;
};

export interface HttpGetClient<T> {
  get(params: HttpGetParams): Promise<HttpResponse<T>>;
}
