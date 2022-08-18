export interface Error {
  statusCode: number;
  error: string;
  message: string;
}


export interface User {
  username: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  error?: Error;
}
