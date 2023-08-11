import { component$ } from "@builder.io/qwik";
import Trash from "../icons/trash";
import Switch from "../switch/switch";

interface TagProps {
  name: string;
  value: string;
}

export default component$<TagProps>(({ name, value }) => {
  return (
    <article class="flex flex-col border rounded-md drop-shadow-sm">
      <div class="border-b">
        <div class="flex">
          <span class="font-bold p-2">{name}</span>
          <span class="ml-auto flex items-center">
            <span class="border-l flex items-center h-full p-2">
              <button class="text-red-500">
                <Trash />
              </button>
            </span>
            <span class="border-l flex items-center h-full p-2">
              <Switch />
            </span>
          </span>
        </div>
      </div>
      <div class="p-2">{value}</div>
    </article>
  );
});
