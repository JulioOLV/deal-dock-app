import { InvalidCredentialsError, NoDataReceivedError, UnexpectedError } from "@/domain/errors";
import { RefreshToken } from "./refresh-token";
import { HttpStatusCode } from "@/data/protocols/http";

describe("RefreshToken unit test", () => {
  test("Should throw when no data is received", async () => {
    const url = "https://api.example.com/refresh-token";
    const fetchHttpClient = {
      post: jest.fn().mockResolvedValue({ statusCode: 200 }),
    };
    const refreshToken = new RefreshToken(url, fetchHttpClient);
    const promise = refreshToken.getToken();
    await expect(promise).rejects.toThrow(new NoDataReceivedError());
  });

  test("Should throw when status code is 401", async () => {
    const url = "https://api.example.com/refresh-token";
    const fetchHttpClient = {
      post: jest
        .fn()
        .mockResolvedValue({
          statusCode: HttpStatusCode.unauthorized,
          body: null,
        }),
    };
    const refreshToken = new RefreshToken(url, fetchHttpClient);
    const promise = refreshToken.getToken();
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw when status code is 500", async () => {
    const url = "https://api.example.com/refresh-token";
    const fetchHttpClient = {
      post: jest
        .fn()
        .mockResolvedValue({
          statusCode: HttpStatusCode.serverError,
          body: null,
        }),
    };
    const refreshToken = new RefreshToken(url, fetchHttpClient);
    const promise = refreshToken.getToken();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return token when status code is 200", async () => {
    const url = "https://api.example.com/refresh-token";
    const fetchHttpClient = {
      post: jest.fn().mockResolvedValue({
        statusCode: 200,
        body: { accessToken: "newAccessToken" },
      }),
    };
    const refreshToken = new RefreshToken(url, fetchHttpClient);
    const response = await refreshToken.getToken();
    expect(response).toEqual({ accessToken: "newAccessToken" });
  });
});
