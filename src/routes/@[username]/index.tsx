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
      <div class="max-w-[1274px] mx-auto flex p-4">
        {profile.value ? (
          <div class="grid grid-cols-12 mt-[100px]">
            <div class="col-span-full">
              <p>Username: {profile.value.username}</p>

              <p>Member since {profile.value.joinedDate}</p>

              <p>Tags</p>
              <div class="grid grid-cols-2 gap-3">
                {profile.value.tags.map((tag) => (
                  <div class="p-3 border rounded shadow">
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
      </div>
    </>
  );
});
