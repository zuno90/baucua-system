export interface IJwtRequest {
  jwt: string;
}

export interface IJwtPayload {
  id: number;
  username: string;
  role: string;
}

export interface IUserGrpc {
  id: number;
  username: string;
  amount: number;
  role: string;
}
