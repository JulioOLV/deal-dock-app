export type TokenApiResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
};

export type TokenApiRequest = {
  grant_type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
};