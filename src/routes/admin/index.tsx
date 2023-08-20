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
      <h1 class="text-xl">
        Welcome {signal.value.username} (<Logout />)
      </h1>
      {!isFormOpen.value && (
        <button
          onClick$={() => (isFormOpen.value = true)}
          class="flex items-center"
        >
          <Plus /> Add tag
        </button>
      )}
      {isFormOpen.value && (
        <Form
          action={addTagAction}
          onSubmitCompleted$={() => {
            isFormOpen.value = false;
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="PSN, XBox, Steam..."
            autoFocus
          />
          <input type="text" name="value" placeholder="ninja, dr_respect..." />
          <button type="submit">Add</button>
          <button type="button" onClick$={() => (isFormOpen.value = false)}>
            Cancel
          </button>
        </Form>
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
    </>
  );
});
