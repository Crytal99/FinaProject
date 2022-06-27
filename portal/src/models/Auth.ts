// Response data
export interface IAuthResponseData {
  access_token: string;
}

export interface IUser {
  name: string;
  email: string;
  domain: string;
}

export interface ILoginOAuthData {
  token: string;
  expiredAt: number;
}
