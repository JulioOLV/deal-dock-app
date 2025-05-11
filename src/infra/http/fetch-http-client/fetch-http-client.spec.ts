import { FetchHttpClient } from "./fetch-http-client";

describe("FetchHttpClient", () => {
  beforeEach(() => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: "response" }),
    });
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Should call fetch with correct URL for GET method", async () => {
    const url = "https://api.example.com/data";
    const method = "GET";
    const token = "accessToken";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const fetchHttpClient = new FetchHttpClient("accessToken");
    const response = await fetchHttpClient.get({
      url,
    });
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method,
      headers,
      cache: "force-cache",
    });
    expect(response.body).toEqual({ data: "response" });
  });

  test("Should call fetch with correct URL for POST method", async () => {
    const url = "https://api.example.com/data";
    const method = "POST";
    const fetchHttpClient = new FetchHttpClient("accessToken");
    const response = await fetchHttpClient.post({
      url,
    });
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method,
      body: "grant_type=&client_id=&client_secret=&refresh_token=",
    });
    expect(response.body).toEqual({ data: "response" });
  });
});
