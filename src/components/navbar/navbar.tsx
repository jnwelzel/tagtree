import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { useLogout } from "../logout/logout";
import Close from "../icons/close";

import styles from "./navbar.css?inline";
import { Link } from "../link/link";

interface NavbarProps {
  userName?: string;
}

export default component$<NavbarProps>(({ userName }) => {
  const logoutAction = useLogout();
  const isMenuVisible = useSignal(false);

  useStylesScoped$(styles);

  return (
    <>
      <nav class="bg-gray-800 text-white py-4 px-3 grid grid-cols-12 2xl:px-0 z-30 fixed top-0 left-0 right-0 h-[80px] items-center">
        <div class="col-span-full 2xl:col-start-2 2xl:col-end-12 text-right flex items-center">
          <Link href="/" class="mr-auto tagtree-font text-2xl text-white">
            Tagtree
          </Link>
          {userName && (
            <button
              class="bg-white rounded-full text-violet-600 h-12 w-12 text-2xl flex items-center justify-center"
              onClick$={() => (isMenuVisible.value = !isMenuVisible.value)}
            >
              {userName.charAt(0).toUpperCase()}
            </button>
          )}
        </div>
      </nav>

      {userName && (
        <div
          class={`fixed top-[80px] left-0 right-0 bg-slate-700 flex flex-col z-20 py-3 slide-up text-white ${
            isMenuVisible.value ? "slide-down" : ""
          }`}
        >
          <div class="relative flex flex-col">
            <div class="absolute top-0 right-3">
              <button onClick$={() => (isMenuVisible.value = false)}>
                <Close />
              </button>
            </div>
            <div class="text-center mb-2">
              <Link href="/admin">
                <b class="text-violet-300 text-lg">{userName}</b>
              </Link>
            </div>
            <div class="grid grid-cols-1 gap-2">
              <Link class="text-center" href={`/@${userName}`}>
                Profile
              </Link>
              <Link class="text-center" href="/settings">
                Settings
              </Link>
              <button
                onClick$={() => {
                  logoutAction.submit();
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {isMenuVisible.value && (
        <div
          class="z-10 fixed top-[80px] right-0 bottom-0 left-0"
          onClick$={() => (isMenuVisible.value = false)}
        />
      )}
    </>
  );
});
