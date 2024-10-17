import { component$, useSignal } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { addTag, deleteTag, editTag, getUserTags } from "./helper";
import Plus from "~/components/icons/plus";
import Tag from "./tag";
import Navbar from "~/components/navbar/navbar";
import { useUser } from "../layout";
import Footer from "~/components/footer/footer";

export type SessionCookie = {
  email: string;
  username: string;
  accessToken: string;
};

export const useTagsList = routeLoader$(async ({ sharedMap }) => {
  const { accessToken } = sharedMap.get("user") as SessionCookie;
  const tags = await getUserTags(accessToken);

  return tags;
});

export const useAddTag = routeAction$(
  async (tag, { sharedMap }) => {
    const { accessToken } = sharedMap.get("user") as SessionCookie;

    await addTag(tag, accessToken);
  },
  zod$({
    name: z.string(),
    description: z.string(),
  })
);

export const useDeleteTag = routeAction$(
  async (tag, { sharedMap }) => {
    const { accessToken } = sharedMap.get("user") as SessionCookie;
    const success = await deleteTag(tag.tagId, accessToken);
    return success;
  },
  zod$({
    tagId: z.string(),
  })
);

export const useEditTag = routeAction$(
  async (tag, { sharedMap }) => {
    const { accessToken } = sharedMap.get("user") as SessionCookie;

    const dto = {
      name: tag.name,
      description: tag.description,
      id: parseInt(tag.tagId),
    };

    await editTag(dto, accessToken);
  },
  zod$({
    tagId: z.string(),
    name: z.string(),
    description: z.string(),
  })
);

export default component$(() => {
  const tags = useTagsList();
  const user = useUser();
  const isFormOpen = useSignal(false);
  const addTagAction = useAddTag();

  return (
    <div class="flex flex-col min-h-full">
      <Navbar userName={user.value?.username} />
      <div class="max-w-[1274px] mx-auto flex p-4 flex-1 w-full">
        <div class="grid grid-cols-12 mt-[100px] w-full">
          <div class="col-span-full">
            {!isFormOpen.value && (
              <button
                onClick$={() => (isFormOpen.value = true)}
                class="flex items-center rounded-full bg-violet-400 text-white px-4 py-2 font-medium mb-6 ml-auto mr-auto"
              >
                <Plus /> Add tag
              </button>
            )}
            {isFormOpen.value && (
              <div class="px-3 py-4 mb-3 border rounded-md drop-shadow-sm">
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
                    name="description"
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

            {tags.value?.length === 0 && (
              <p class="text-red-500">You haven't added any gamer tags yet.</p>
            )}
            {(tags.value?.length ?? 0) > 0 && (
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                {tags?.value?.map((tag) => <Tag key={tag.id} {...tag} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer translucid={false} />
    </div>
  );
});
