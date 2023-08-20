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
  userId: string,
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
  userId: string,
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
  accessToken: string
): Promise<boolean> => {
  return await api.delete<boolean>(
    `${EndpointEnum.Tags}/${tagId}`,
    accessToken
  );
};

export const editTag = async (tag: Tag, accessToken: string): Promise<Tag> => {
  return await api.put<Tag, Tag>(
    `${EndpointEnum.Tags}/${tag.id}`,
    tag,
    accessToken
  );
};
