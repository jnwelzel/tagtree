import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, Link } from "@builder.io/qwik-city";
import { Link as MyLink } from "~/components/link/link";
import { useLogout } from "~/components/logout/logout";
import CookiesEnum from "~/utils/CookiesEnum";
import styles from "./index.css?inline";

export const useSessionData = routeLoader$(async ({ cookie }) => {
  const isLoggedIn = cookie.has(CookiesEnum.Session);

  return { isLoggedIn };
});

export default component$(() => {
  const signal = useSessionData();
  const logoutAction = useLogout();
  useStylesScoped$(styles);

  return (
    <div class="flex flex-col min-h-full text-center">
      <div class="flex-1">
        <div class="flex items-center p-4 justify-end border-b border-gray-300">
          {!signal.value.isLoggedIn && (
            <>
              <MyLink href="/login" class="mr-3">
                Login
              </MyLink>
              <Link
                href="/signup"
                class="rounded-full px-5 py-3 bg-violet-400 text-white"
              >
                Create an account
              </Link>
            </>
          )}
          {signal.value.isLoggedIn && (
            <>
              <MyLink href="/admin" class="mr-3">
                Admin
              </MyLink>
              <button
                onClick$={() => logoutAction.submit()}
                class="rounded-full px-5 py-3 bg-violet-400 text-white"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
      <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-9 text-white flex-1 flex flex-col items-center justify-center relative tagtree-gradient">
        <h1 class="text-7xl md:text-9xl tagtree-font drop-shadow-md">
          Tagtree
        </h1>
        <h2 class="text-xl drop-shadow">All your gamer tags in one place.</h2>
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
