import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { addUser } from "./helper";
import { getErrorMessage } from "~/utils/errorHandling";
import CookiesEnum from "~/utils/CookiesEnum";
import { EndpointEnum } from "~/utils/api";
import type { SessionCookie } from "../admin";
import { Link } from "~/components/link/link";

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
        userId: authUser.id,
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
    <>
      <h1 class="text-xl">Create an account</h1>
      <Form class="flex flex-col" action={action}>
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
        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          class="form-checkbox rounded text-pink-500"
        />
        <label for="newsletter">Newsletter</label>
        <p>
          By clicking <b>Create account</b>, you agree to Tagtree's Terms and
          Conditions and confirm you have read our Privacy Notice.
        </p>
        <button type="submit">Create account</button>
      </Form>
      {action.value?.failed && (
        <p class="text-red-500">{action.value.message}</p>
      )}
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
      <p>
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply.
      </p>
    </>
  );
});
