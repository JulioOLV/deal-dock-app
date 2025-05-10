import {
  HttpGetParams,
  HttpGetClient,
  HttpResponse,
} from "@/data/protocols/http";

export class FetchHttpClient implements HttpGetClient<any> {
  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const response = await fetch(params.url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer APP_USR-4177817543971930-051016-a679aa3622afb3b90ed48ae0beef3696-171802850`,
      },
      cache: "force-cache",
    });

    const body = await response.json();

    return {
      statusCode: response.status,
      body,
    };
  }
}
