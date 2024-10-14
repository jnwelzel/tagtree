import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/navbar/navbar";
import { useUser } from "../layout";

export default component$(() => {
  const user = useUser();

  return (
    <>
      <Navbar userName={user.value?.username} />
      <div class="mt-[100px]">
        <h1>Settings</h1>
      </div>
    </>
  );
});
