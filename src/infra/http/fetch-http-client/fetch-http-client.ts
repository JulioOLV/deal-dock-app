import {
  HttpGetParams,
  HttpGetClient,
  HttpResponse,
} from "@/data/protocols/http";

export class FetchHttpClient implements HttpGetClient<any> {
  constructor(
    private readonly accessToken: string | undefined,
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const response = await fetch(params.url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      cache: "force-cache",
    });

    const body = await response.json();

    return {
      statusCode: response.status,
      body,
    };
  }

  async post(params: HttpGetParams): Promise<HttpResponse<any>> {
    const urlParams = new URLSearchParams();
    urlParams.append("grant_type", process.env.GRANT_TYPE || "");
    urlParams.append("client_id", process.env.CLIENT_ID || "");
    urlParams.append("client_secret", process.env.CLIENT_SECRET || "");
    urlParams.append("refresh_token", process.env.REFRESH_TOKEN || "");

    const response = await fetch(params.url, {
      method: "POST",
      body: urlParams.toString(),
    });

    const body = await response.json();

    return {
      statusCode: response.status,
      body,
    };
  }
}
