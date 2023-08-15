import { component$ } from "@builder.io/qwik";
import { globalAction$ } from "@builder.io/qwik-city";
import CookiesEnum from "~/utils/CookiesEnum";

export const useLogout = globalAction$((_data, { cookie, redirect }) => {
  cookie.delete(CookiesEnum.Session, { path: "/" });

  throw redirect(308, "/");
});

export default component$(() => {
  const action = useLogout();

  return <button onClick$={() => action.submit()}>Log out</button>;
});
