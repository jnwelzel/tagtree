import { EndpointEnum, api } from "~/utils/api";

export type Tag = {
  id: number;
  userId?: string;
  name: string;
  description: string;
};

export type TagForm = {
  name: string;
  description: string;
};

interface TagDto {
  name: string;
  description: string;
  id: number;
}

interface TagModelList {
  tagModelList?: [Tag];
}
interface TagResponse {
  _embedded?: TagModelList;
}

export const getUserTags = async (
  accessToken: string
): Promise<[TagDto] | []> => {
  const data = await api.get<TagResponse>(EndpointEnum.MyTags, accessToken);
  return data._embedded?.tagModelList ?? [];
};

export const addTag = async (
  tag: TagForm,
  accessToken: string
): Promise<TagResponse> => {
  return await api.post<TagForm, TagResponse>(
    EndpointEnum.Tags,
    tag,
    accessToken
  );
};

export const deleteTag = async (
  tagId: string,
  accessToken: string
): Promise<boolean> => {
  try {
    await api.delete(`${EndpointEnum.Tags}/${tagId}`, accessToken);

    return true;
  } catch (e) {
    return false;
  }
};

export const editTag = async (tag: Tag, accessToken: string): Promise<Tag> => {
  return await api.put<Tag, Tag>(EndpointEnum.Tags, tag, accessToken);
};
