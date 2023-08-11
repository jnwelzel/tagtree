import { component$, useSignal } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import CookiesEnum from "~/utils/CookiesEnum";
import { addTag, getUserTags } from "./helper";

export type SessionCookie = {
  email: string;
  username: string;
  accessToken: string;
  userId: number;
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

export default component$(() => {
  const signal = useUserData();
  const isFormOpen = useSignal(false);
  const action = useAddTag();

  return (
    <>
      <h1 class="text-xl">Welcome {signal.value.username}</h1>
      {!isFormOpen.value && (
        <button onClick$={() => (isFormOpen.value = true)}>+ Add tag</button>
      )}
      {isFormOpen.value && (
        <Form
          action={action}
          onSubmitCompleted$={() => {
            isFormOpen.value = false;
          }}
        >
          <input type="text" name="name" placeholder="PSN, XBox, Steam..." />
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
            <div key={tag.id} class="p-2 border my-2 rounded drop-shadow-sm">
              <p>{tag.name}</p>
              <p>{tag.value}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
});
