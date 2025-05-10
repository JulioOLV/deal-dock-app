import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, NoDataReceivedError, UnexpectedError } from "@/domain/errors";
import { ProductAPIResponse } from "@/domain/models";
import { IListProduct } from "@/domain/usecases";

export class ListProduct implements IListProduct {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<ProductAPIResponse>
  ) {}

  async getProductList(): Promise<ProductAPIResponse> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

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
