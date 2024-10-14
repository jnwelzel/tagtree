import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { UserProfile, getProfileData } from "./helper";
import Navbar from "~/components/navbar/navbar";
import { useUser } from "../layout";

export const useProfileData = routeLoader$(async ({ params }) => {
  const { username } = params;
  const profileData = await getProfileData(username);

  return profileData ? (profileData as UserProfile) : null;
});

export default component$(() => {
  const profile = useProfileData();
  const loc = useLocation();
  const user = useUser();

  return (
    <>
      <Navbar userName={user.value?.username} />
      {profile.value ? (
        <div class="grid grid-cols-12 mt-[100px]">
          <div class="col-span-full 2xl:col-start-2 2xl:col-end-12">
            <p>Username: {profile.value.username}</p>

            <p>Member since {profile.value.joinedDate}</p>

            <p>Tags</p>
            <div>
              {profile.value.tags.map((tag) => (
                <div>
                  <p>Name: {tag.name}</p>
                  <p>Description: {tag.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>User {loc.params.username} not found.</div>
      )}
    </>
  );
});
