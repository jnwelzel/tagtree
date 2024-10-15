import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/navbar/navbar";
import { useUser } from "../layout";

export default component$(() => {
  const user = useUser();

  return (
    <>
      <Navbar userName={user.value?.username} />
      <div class="grid grid-cols-12 px-3 2xl:px-0 mt-[100px]">
        <div class="col-span-full 2xl:col-start-2 2xl:col-end-12">
          <h1>Settings</h1>
        </div>
      </div>
    </>
  );
});
