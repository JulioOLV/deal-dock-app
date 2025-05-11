import { InvalidCredentialsError, NoDataReceivedError, UnexpectedError } from "@/domain/errors";
import { GetProductDetail } from "./get-product-detail";
import { HttpStatusCode } from "@/data/protocols/http";

describe("GetProductDetail unit test", () => {
  test("Should throw when no data is received", async () => {
    const url = "https://api.example.com/product-detail";
    const fetchHttpClient = {
      get: jest.fn().mockResolvedValue({ statusCode: HttpStatusCode.ok }),
    };
    const getProductDetail = new GetProductDetail(url, fetchHttpClient);
    const promise = getProductDetail.getProductDetail();
    await expect(promise).rejects.toThrow(new NoDataReceivedError());
  });

  test("Should throw when status code is 401", async () => {
    const url = "https://api.example.com/product-detail";
    const fetchHttpClient = {
      get: jest
        .fn()
        .mockResolvedValue({
          statusCode: HttpStatusCode.unauthorized,
          body: null,
        }),
    };
    const getProductDetail = new GetProductDetail(url, fetchHttpClient);
    const promise = getProductDetail.getProductDetail();
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw when status code is 500", async () => {
    const url = "https://api.example.com/product-detail";
    const fetchHttpClient = {
      get: jest
        .fn()
        .mockResolvedValue({
          statusCode: HttpStatusCode.serverError,
          body: null,
        }),
    };
    const getProductDetail = new GetProductDetail(url, fetchHttpClient);
    const promise = getProductDetail.getProductDetail();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return product detail when status code is 200", async () => {
    const url = "https://api.example.com/product-detail";
    const fetchHttpClient = {
      get: jest.fn().mockResolvedValue({
        statusCode: HttpStatusCode.ok,
        body: { id: 1, name: "Product A", price: 100 },
      }),
    };
    const getProductDetail = new GetProductDetail(url, fetchHttpClient);
    const response = await getProductDetail.getProductDetail();
    expect(response).toEqual({ id: 1, name: "Product A", price: 100 });
  });
});