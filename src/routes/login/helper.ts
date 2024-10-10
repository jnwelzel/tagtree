import { EndpointEnum, api } from "~/utils/api";

export type UserLogin = {
  email: string;
  password: string;
};

interface LoginResponse {
  accessToken: string;
  tokenType: string;
}

export const loginUser = async (
  userLogin: UserLogin
): Promise<LoginResponse> => {
  return await api.post<UserLogin, LoginResponse>(
    EndpointEnum.Login,
    userLogin
  );
};

interface TagDto {
  id: number;
  name: string;
  description: string;
  userId: string;
}

interface UserDto {
  uuid: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  tags: [TagDto] | [];
}

export const userInfo = async (accessToken: string): Promise<UserDto> => {
  return await api.get<UserDto>(EndpointEnum.UserInfo, accessToken);
};
