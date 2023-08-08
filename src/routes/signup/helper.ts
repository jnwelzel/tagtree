import { EndpointEnum, api } from "~/utils/api";

export type User = {
  email: string;
  username: string;
  newsletter: boolean;
  password: string;
  activatedAt?: string;
};

interface JSONResponse {
  accessToken: string;
  user: User;
}

export const addUser = async (user: User): Promise<JSONResponse> => {
  return await api.post<User, JSONResponse>(EndpointEnum.Signup, user);
};
