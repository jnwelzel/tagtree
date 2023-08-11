import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Link } from "~/components/link/link";
import CookiesEnum from "~/utils/CookiesEnum";

export const useSessionData = routeLoader$(async ({ cookie }) => {
  const isLoggedIn = cookie.has(CookiesEnum.Session);

  return { isLoggedIn };
});

export default component$(() => {
  const signal = useSessionData();

  return (
    <>
      <h1 class="text-2xl">All your gamer tags in one place.</h1>
      {signal.value.isLoggedIn && (
        <>
          <Link href="/admin">Admin</Link>
          <Link href="/logout">Log out</Link>
        </>
      )}
      {!signal.value.isLoggedIn && (
        <p>
          <Link href="/signup">Create an account</Link> or{" "}
          <Link href="/login">log in</Link>.
        </p>
      )}
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
