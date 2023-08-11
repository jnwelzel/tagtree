import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Link } from "~/components/link/link";

export default component$(() => {
  return (
    <>
      <h1 class="text-2xl">All your gamer tags in one place.</h1>
      <p>
        <Link href="/signup">Create an account</Link> or{" "}
        <Link href="/login">log in</Link>.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Tagtree",
  meta: [
    {
      name: "description",
      content: "Manage and share your gamer tags, all in one place.",
    },
  ],
};
