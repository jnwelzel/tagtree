import { component$, useSignal } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import CookiesEnum from "~/utils/CookiesEnum";
import { addTag, deleteTag, editTag, getUserTags } from "./helper";
import Logout from "~/components/logout/logout";
import Plus from "~/components/icons/plus";
import Tag from "./tag";

export type SessionCookie = {
  email: string;
  username: string;
  accessToken: string;
  userId: string;
};

export const useUserData = routeLoader$(async ({ cookie, redirect }) => {
  if (!cookie.has(CookiesEnum.Session)) {
    throw redirect(308, "/");
  }

  const { username, userId, accessToken } = cookie
    .get(CookiesEnum.Session)
    ?.json() as SessionCookie;

  // Fetch the user's tags
  const tags = await getUserTags(userId, accessToken);

  return { username, tags };
});

export const useAddTag = routeAction$(
  async (tag, { cookie }) => {
    const { userId, accessToken } = cookie
      .get(CookiesEnum.Session)
      ?.json() as SessionCookie;

    await addTag(tag, userId, accessToken);
  },
  zod$({
    name: z.string(),
    value: z.string(),
  })
);

export const useDeleteTag = routeAction$(
  async (tag, { cookie }) => {
    const { accessToken } = cookie
      .get(CookiesEnum.Session)
      ?.json() as SessionCookie;
    const success = await deleteTag(tag.tagId, accessToken);
    return success;
  },
  zod$({
    tagId: z.string(),
  })
);

export const useEditTag = routeAction$(
  async (tag, { cookie }) => {
    const { accessToken, userId } = cookie
      .get(CookiesEnum.Session)
      ?.json() as SessionCookie;

    const dto = {
      name: tag.name,
      value: tag.value,
      id: parseInt(tag.tagId),
      userId,
    };

    await editTag(dto, accessToken);
  },
  zod$({
    tagId: z.string(),
    name: z.string(),
    value: z.string(),
  })
);

export default component$(() => {
  const signal = useUserData();
  const isFormOpen = useSignal(false);
  const addTagAction = useAddTag();

  return (
    <>
      <nav class="bg-gray-800 text-white py-4 px-3 mb-6 grid grid-cols-12 2xl:px-0">
        <div class="col-span-full 2xl:col-start-2 2xl:col-end-12 text-right flex items-center">
          <div class="mr-auto tagtree text-2xl text-white">Tagtree</div>
          <div>
            Welcome <b class="text-violet-300">{signal.value.username}</b> (
            <Logout />)
          </div>
        </div>
      </nav>
      <div class="grid grid-cols-12 px-3 2xl:px-0">
        <div class="col-span-full 2xl:col-start-2 2xl:col-end-12">
          {!isFormOpen.value && (
            <button
              onClick$={() => (isFormOpen.value = true)}
              class="flex items-center rounded-full bg-violet-400 text-white px-4 py-2 font-medium mb-6 ml-auto mr-auto"
            >
              <Plus /> Add tag
            </button>
          )}
          {isFormOpen.value && (
            <div class="bg-white px-3 py-4 mb-3 border rounded-md drop-shadow-sm">
              <Form
                action={addTagAction}
                onSubmitCompleted$={() => {
                  isFormOpen.value = false;
                }}
                class="grid gap-3 grid-cols-1 md:grid-cols-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="PSN, XBox, Steam..."
                  autoFocus
                />
                <input
                  type="text"
                  name="value"
                  placeholder="ninja, dr_respect..."
                />
                <button
                  type="button"
                  onClick$={() => (isFormOpen.value = false)}
                  class="rounded-full border px-4 py-1 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="rounded-full bg-violet-400 text-white px-4 py-1 font-medium"
                >
                  Add
                </button>
              </Form>
            </div>
          )}

          {signal.value.tags.length === 0 && (
            <p class="text-red-500">You haven't added any gamer tags yet.</p>
          )}
          {signal.value.tags.length > 0 && (
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              {signal.value.tags.map((tag) => (
                <Tag key={tag.id} {...tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
});
