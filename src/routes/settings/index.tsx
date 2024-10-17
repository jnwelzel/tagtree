import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/navbar/navbar";
import { useUser } from "../layout";
import Footer from "~/components/footer/footer";

export default component$(() => {
  const user = useUser();

  return (
    <div class="flex flex-col min-h-full">
      <Navbar userName={user.value?.username} />
      <div class="max-w-[1274px] mx-auto flex p-4 flex-1 w-full">
        <div class="grid grid-cols-12 mt-[100px]">
          <div class="col-span-full 2xl:col-start-2 2xl:col-end-12">
            <h1>Settings</h1>
          </div>
        </div>
      </div>
      <Footer translucid={false} />
    </div>
  );
});
