import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, NoDataReceivedError, UnexpectedError } from "@/domain/errors";
import { ProductAPIDetailResponse } from "@/domain/models/product-detail-model";
import { IGetProductDetail } from "@/domain/usecases";

export class GetProductDetail implements IGetProductDetail {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<ProductAPIDetailResponse>
  ) {}

  async getProductDetail(): Promise<ProductAPIDetailResponse> {
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