import { HttpStatusCode } from "@/data/protocols/http";
import { NoDataReceivedError, InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { ListProduct } from "./list-product";

describe("ListProduct unit test", () => {
  test("Should throw when no data is received", async () => {
    const url = "https://api.example.com/products";
    const fetchHttpClient = {
      get: jest.fn().mockResolvedValue({ statusCode: HttpStatusCode.ok }),
    };
    const listProduct = new ListProduct(url, fetchHttpClient);
    const promise = listProduct.getProductList();
    await expect(promise).rejects.toThrow(new NoDataReceivedError());
  });

  test("Should throw when status code is 401", async () => {
    const url = "https://api.example.com/products";
    const fetchHttpClient = {
      get: jest
        .fn()
        .mockResolvedValue({
          statusCode: HttpStatusCode.unauthorized,
          body: null,
        }),
    };
    const listProduct = new ListProduct(url, fetchHttpClient);
    const promise = listProduct.getProductList();
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw when status code is 500", async () => {
    const url = "https://api.example.com/products";
    const fetchHttpClient = {
      get: jest
        .fn()
        .mockResolvedValue({
          statusCode: HttpStatusCode.serverError,
          body: null,
        }),
    };
    const listProduct = new ListProduct(url, fetchHttpClient);
    const promise = listProduct.getProductList();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return product list when status code is 200", async () => {
    const url = "https://api.example.com/products";
    const fetchHttpClient = {
      get: jest.fn().mockResolvedValue({
        statusCode: HttpStatusCode.ok,
        body: { products: [{ id: 1, name: "Product A", price: 100 }] },
      }),
    };
    const listProduct = new ListProduct(url, fetchHttpClient);
    const response = await listProduct.getProductList();
    expect(response).toEqual({ products: [{ id: 1, name: "Product A", price: 100 }] });
  });
});