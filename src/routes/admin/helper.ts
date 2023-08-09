import { EndpointEnum, api } from "~/utils/api";

export type Tag = {
  id?: number;
  userId?: string;
  name: string;
  value: string;
};

export const getUserTags = async (
  userId: number,
  accessToken: string
): Promise<[Tag] | []> => {
  const tags = api.get<[Tag]>(
    `${EndpointEnum.Users}/${userId}${EndpointEnum.Tags}`,
    accessToken
  );

  return tags;
};

export const addTag = async (
  tag: Tag,
  userId: number,
  accessToken: string
): Promise<Tag> => {
  return await api.post<Tag, Tag>(
    `${EndpointEnum.Users}/${userId}${EndpointEnum.Tags}`,
    tag,
    accessToken
  );
};
