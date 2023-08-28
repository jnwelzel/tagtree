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
    <div class="flex flex-col min-h-full text-center">
      <div class="flex-1">
        {signal.value.isLoggedIn && (
          <>
            <Link href="/admin">Admin</Link>
            <Link href="/logout">Log out</Link>
          </>
        )}
        {!signal.value.isLoggedIn && (
          <>
            <Link href="/signup">Create an account</Link> or{" "}
            <Link href="/login">log in</Link>.
          </>
        )}
      </div>
      <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-9 text-white flex-1 flex flex-col items-center justify-center">
        <h1 class="text-7xl md:text-9xl tagtree drop-shadow-md">Tagtree</h1>
        <h2 class="text-xl">All your gamer tags in one place.</h2>
      </div>
      <div class="flex-1">footer</div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Tagtree | All your gamer tags in one place.",
  meta: [
    {
      name: "description",
      content: "Manage and share your gamer tags, all in one place.",
    },
  ],
};
