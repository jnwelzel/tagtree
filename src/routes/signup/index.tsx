import { component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { addUser } from "./helper";
import { getErrorMessage } from "~/utils/errorHandling";
import CookiesEnum from "~/utils/CookiesEnum";
import { EndpointEnum } from "~/utils/api";
import type { SessionCookie } from "../admin";
import { Link } from "~/components/link/link";
import Navbar from "~/components/navbar/navbar";

export const onRequest: RequestHandler = async ({ redirect, cookie }) => {
  if (cookie.has(CookiesEnum.Session)) {
    throw redirect(308, "/admin");
  }
};

export const useAddUser = routeAction$(
  async (user, { fail, cookie, redirect }) => {
    try {
      // Persist User
      const { accessToken, user: authUser } = await addUser({
        email: user.email,
        username: user.username,
        newsletter: (user.newsletter ?? "") === "on",
        password: user.password,
      });

      // Set session cookie
      const sessionCookieData = {
        username: authUser.username,
        email: authUser.email,
        accessToken,
        userId: authUser.id.toString(),
      } as SessionCookie;

      cookie.set(CookiesEnum.Session, JSON.stringify(sessionCookieData), {
        httpOnly: true,
        secure: true,
        maxAge: [1, "hours"],
        path: "/",
      });
    } catch (error) {
      return fail(400, {
        message: getErrorMessage(error),
      });
    }

    // Redirect to admin page
    throw redirect(308, EndpointEnum.Admin);
  },
  zod$({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string(),
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" }),
    newsletter: z.string().nullish(),
  })
);

export default component$(() => {
  const action = useAddUser();

  return (
    <div class="flex flex-col min-h-full">
      <Navbar />
      <div class="flex-1 px-3 md:px-0 md:w-96 ml-auto mr-auto justify-center flex flex-col">
        <h1 class="text-xl text-center mb-3">Create an account</h1>
        <Form
          class="grid grid-cols-1 gap-3 p-5 border bg-white rounded-md drop-shadow-md"
          action={action}
        >
          <input type="email" name="email" placeholder="Email" autoFocus />
          {action.value?.failed && (
            <p class="text-red-500">{action.value.fieldErrors?.email}</p>
          )}
          <input
            type="text"
            name="username"
            placeholder="tagtree.link/ Username"
          />
          <input type="password" placeholder="Password" name="password" />
          {action.value?.failed && (
            <p class="text-red-500">{action.value.fieldErrors?.password}</p>
          )}
          {action.value?.failed && (
            <p class="text-red-500">{action.value.message}</p>
          )}
          <div class="flex items-center">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              class="form-checkbox rounded text-pink-500"
            />
            <label for="newsletter" class="ml-2">
              Receive our totally awesome newsletter
            </label>
          </div>
          <p class="text-sm">
            By clicking <b>Create account</b>, you agree to Tagtree's Terms and
            Conditions and confirm you have read our Privacy Notice.
          </p>
          <button
            type="submit"
            class="rounded-full bg-violet-400 text-white px-4 py-2 font-medium mb-3"
          >
            Create account
          </button>
          <p class="text-sm">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
          <p class="text-sm">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </Form>
      </div>
      <div class="flex-1">Footer</div>
    </div>
  );
});
