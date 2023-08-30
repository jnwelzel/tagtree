import { globalAction$ } from "@builder.io/qwik-city";
import CookiesEnum from "~/utils/CookiesEnum";

export const useLogout = globalAction$((_data, { cookie, redirect }) => {
  cookie.delete(CookiesEnum.Session, { path: "/" });

  throw redirect(308, "/");
});
