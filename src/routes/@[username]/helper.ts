import { EndpointEnum, api } from "~/utils/api";

interface UserProfileTag {
  name: string;
  description: string;
}

export interface UserProfile {
  uuid: string;
  username: string;
  joinedDate: string;
  tags: [UserProfileTag] | [];
}

export const getProfileData = async (
  username: string
): Promise<UserProfile | null> => {
  try {
    const data = await api.get<UserProfile>(
      `${EndpointEnum.UserProfile}/${username}`
    );

    return data;
  } catch (error) {
    return null;
  }
};
