import { component$, useSignal } from "@builder.io/qwik";
import Trash from "~/components/icons/trash";
import { useDeleteTag, useEditTag } from ".";
import { Form } from "@builder.io/qwik-city";

interface TagProps {
  name: string;
  value: string;
  id: number;
}

export default component$<TagProps>(({ name, value, id }) => {
  const isDelete = useSignal(false);
  const isEdit = useSignal(false);
  const tagName = useSignal(name);
  const tagValue = useSignal(value);

  const deleteAction = useDeleteTag();
  const editAction = useEditTag();

  return (
    <article class="flex flex-col border rounded-md drop-shadow-sm relative z-0 bg-white">
      {isDelete.value && (
        <div class="absolute z-10 top-0 bottom-0 left-0 right-0 bg-red-500 text-white rounded-md flex flex-col">
          <div class="flex items-center justify-center flex-1">
            <h3>{"Are you sure?"}</h3>
          </div>
          <div class="flex justify-evenly p-2 pt-0">
            <button
              type="button"
              onClick$={() => (isDelete.value = false)}
              class="rounded-full bg-white text-black px-4 py-1 font-medium"
            >
              Cancel
            </button>
            <Form action={deleteAction}>
              <button
                type="submit"
                name="tagId"
                value={id}
                class="rounded-full bg-violet-400 text-white px-4 py-1 font-medium"
              >
                Delete
              </button>
            </Form>
          </div>
        </div>
      )}
      {isEdit.value && (
        <div class="absolute z-10 top-0 bottom-0 left-0 right-0 bg-white rounded-md flex flex-col">
          <Form
            action={editAction}
            onSubmitCompleted$={() => {
              isEdit.value = false;
            }}
          >
            <div class="grid grid-cols-2 gap-1">
              <input type="text" bind:value={tagName} name="name" />
              <input type="text" bind:value={tagValue} name="value" />
            </div>
            <div class="flex justify-evenly">
              <button
                type="reset"
                onClick$={() => {
                  tagName.value = name;
                  tagValue.value = value;
                  isEdit.value = false;
                }}
                class="rounded-full border px-4 py-1 font-medium bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                name="tagId"
                value={id}
                class="rounded-full bg-violet-400 text-white px-4 py-1 font-medium"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      )}
      <div class="border-b">
        <div class="flex">
          <div class="font-bold p-2">{name}</div>
          <span class="ml-auto flex items-center">
            <span class="border-l flex items-center h-full p-2">
              <button
                class="text-red-500"
                onClick$={() => (isDelete.value = true)}
              >
                <Trash />
              </button>
            </span>
            <span class="border-l flex items-center h-full p-2">
              <button onClick$={() => (isEdit.value = true)}>Edit</button>
            </span>
          </span>
        </div>
      </div>
      <div class="p-2">{value}</div>
    </article>
  );
});
