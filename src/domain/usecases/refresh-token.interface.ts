import { TokenApiRequest, TokenApiResponse } from "../models";

export interface IRefreshToken {
  getToken(): Promise<TokenApiResponse>;
}