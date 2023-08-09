import { EndpointEnum, api } from "~/utils/api";
import type { User } from "../signup/helper";

export type UserLogin = {
  email: string;
  password: string;
};

interface LoginResponse {
  accessToken: string;
  user: User;
}

export const loginUser = async (
  userLogin: UserLogin
): Promise<LoginResponse> => {
  return await api.post<UserLogin, LoginResponse>(
    EndpointEnum.Login,
    userLogin
  );
};
