import { HttpResponse } from ".";

export type HttpPostParams = {
  url: string;
  body?: any;
};

export interface HttpPostClient<T> {
  post(params: HttpPostParams): Promise<HttpResponse<T>>;
}
