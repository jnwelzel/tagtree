import { component$, Slot } from "@builder.io/qwik";
import {
  Cookie,
  routeLoader$,
  type RequestHandler,
} from "@builder.io/qwik-city";
import CookiesEnum from "~/utils/CookiesEnum";
import { SessionCookie } from "./admin";
import protectedPages from "~/utils/ProtectedPages";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const onRequest: RequestHandler = async ({
  redirect,
  pathname,
  sharedMap,
  cookie,
}) => {
  const user = loadUserFromCookie(cookie);
  if (user) {
    sharedMap.set("user", user);
  }

  // Redirect to login page if curent page is protected and there is no user session
  if (protectedPages.includes(pathname) && !sharedMap.has("user")) {
    throw redirect(302, "/login");
  }
};

const loadUserFromCookie = (cookie: Cookie): SessionCookie | null => {
  // Check cookie for user.
  if (cookie && cookie.get(CookiesEnum.Session)) {
    return cookie.get(CookiesEnum.Session)?.json() as SessionCookie;
  } else {
    return null;
  }
};

export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("user") as SessionCookie;
});

export default component$(() => {
  return <Slot />;
});
