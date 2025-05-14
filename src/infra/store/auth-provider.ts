import { makeRefreshTokenUseCase } from "@/main/factories/usecases/refresh-token-factory";
import { TokenStore } from "./token-store";

export async function authProvider(): Promise<string>  {
  if (!TokenStore.verifyIfTheTokenIsStillValid()) {
    const refreshTokenUseCase = makeRefreshTokenUseCase();
    const token = await refreshTokenUseCase.getToken();
    const expiresIn = new Date();
    expiresIn.setSeconds(expiresIn.getSeconds() + token.expires_in);

    TokenStore.setToken({
      access_token: token.access_token,
      expires_in: expiresIn.getTime(),
    });
  }

  return TokenStore.getToken()!.access_token;
}