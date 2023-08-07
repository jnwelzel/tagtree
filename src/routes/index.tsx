import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1 class="text-2xl">All your gamer tags in one place.</h1>
      <Link href="/signup">Sign up</Link>
    </>
  );
});

export const head: DocumentHead = {
  title: "Tagtree",
  meta: [
    {
      name: "description",
      content: "Manage and share your gamer tags.",
    },
  ],
};
