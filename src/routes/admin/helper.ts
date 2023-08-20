import { EndpointEnum, api } from "~/utils/api";

export type Tag = {
  id: number;
  userId?: string;
  name: string;
  value: string;
};

export type TagDTO = {
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
  tag: TagDTO,
  userId: number,
  accessToken: string
): Promise<Tag> => {
  return await api.post<TagDTO, Tag>(
    `${EndpointEnum.Users}/${userId}${EndpointEnum.Tags}`,
    tag,
    accessToken
  );
};

export const deleteTag = async (
  tagId: string,
  userId: number,
  accessToken: string
): Promise<boolean> => {
  return await api.delete<boolean>(
    `${EndpointEnum.Tags}/${tagId}`,
    accessToken
  );
};
