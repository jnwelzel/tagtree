import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, Link } from "@builder.io/qwik-city";
import { Link as MyLink } from "~/components/link/link";
import { useLogout } from "~/components/logout/logout";
import CookiesEnum from "~/utils/CookiesEnum";
import styles from "./index.css?inline";
import Footer from "~/components/footer/footer";

export const useSessionData = routeLoader$(async ({ cookie }) => {
  const isLoggedIn = cookie.has(CookiesEnum.Session);

  return { isLoggedIn };
});

export default component$(() => {
  const signal = useSessionData();
  const logoutAction = useLogout();
  useStylesScoped$(styles);

  return (
    <div class="flex flex-col min-h-full text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div class="max-w-[1274px] mx-auto flex w-full items-center p-4 justify-end fixed top-0 left-0 right-0">
        {!signal.value.isLoggedIn && (
          <>
            <MyLink href="/login" class="mr-3 text-white">
              Login
            </MyLink>
            <Link
              href="/signup"
              class="rounded-full px-5 py-3 text-white border-2 border-white"
            >
              Create an account
            </Link>
          </>
        )}
        {signal.value.isLoggedIn && (
          <>
            <MyLink href="/admin" class="mr-3 text-white">
              Admin
            </MyLink>
            <button
              onClick$={() => logoutAction.submit()}
              class="rounded-full px-5 py-3 text-white border-2 border-white"
            >
              Log out
            </button>
          </>
        )}
      </div>

      <div class="flex flex-col mt-[150px] md:mt-[256px]">
        <div class="max-w-[1274px] mx-auto flex flex-col p-4 gap-6 md:gap-8">
          <div class="py-9 text-white relative tagtree-logo">
            <h1 class="text-8xl md:text-[200px] tagtree-font drop-shadow-md">
              Tagtree
            </h1>
          </div>
          <div class="max-w-[500px] text-left flex flex-col gap-6 md:gap-8">
            <h2 class="text-4xl md:text-7xl drop-shadow font-black">
              All your gamer tags in one place.
            </h2>
            <p>
              One link to help you share all your gamer tags from XBox, PSN,
              Steam, Epic and other gaming platforms.{" "}
            </p>
            <form class="flex self-center gap-3 w-full flex-wrap">
              <div class="min-w-[174px] flex-1 relative prefix flex items-center">
                <input
                  name="userName"
                  class="rounded w-full h-[52px] indent-[75px]"
                  type="text"
                  placeholder="yourname"
                  autoComplete="username"
                />
              </div>
              <button class="whitespace-nowrap rounded-full px-5 py-3 text-white border-2 border-white">
                Claim your Tagtree
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12">
        <div class="lg:col-start-3 lg:col-span-8 gap-3 lg:gap-0 grid grid-cols-1 lg:grid-cols-2 justify-center"></div>
      </div>

      <div class="flex-1 flex flex-col justify-end">
        <Footer />
      </div>
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
