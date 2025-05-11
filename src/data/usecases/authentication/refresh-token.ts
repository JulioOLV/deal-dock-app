import { HttpStatusCode } from "@/data/protocols/http";
import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { InvalidCredentialsError, NoDataReceivedError, UnexpectedError } from "@/domain/errors";
import { TokenApiResponse } from "@/domain/models";
import { IRefreshToken } from "@/domain/usecases";

export class RefreshToken implements IRefreshToken {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<any>
  ) {}

  async getToken(): Promise<TokenApiResponse> {
    const httpResponse = await this.httpPostClient.post({ url: this.url });

    if (!httpResponse.body) {
      throw new NoDataReceivedError();
    }

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}