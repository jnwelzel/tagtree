import { EndpointEnum, api } from "~/utils/api";
import type { Tag } from "../admin/helper";

export type User = {
  id: number;
  email: string;
  username: string;
  newsletter: boolean;
  password: string;
  activatedAt?: string;
  tags?: [Tag] | [];
};

export type UserDTO = {
  email: string;
  username: string;
  newsletter: boolean;
  password: string;
  activatedAt?: string;
  tags?: [Tag] | [];
};

interface JSONResponse {
  accessToken: string;
  user: User;
}

export const addUser = async (user: UserDTO): Promise<JSONResponse> => {
  return await api.post<UserDTO, JSONResponse>(EndpointEnum.Signup, user);
};
