import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { loginUser } from "./helper";
import { getErrorMessage } from "~/utils/errorHandling";
import { EndpointEnum } from "~/utils/api";
import CookiesEnum from "~/utils/CookiesEnum";

export const useLoginUser = routeAction$(
  async (userLogin, { fail, cookie, redirect }) => {
    try {
      // Authenticate user
      const { accessToken, user: authUser } = await loginUser({
        email: userLogin.email,
        password: userLogin.password,
      });

      // Set session cookie
      cookie.set(
        CookiesEnum.Session,
        JSON.stringify({
          email: authUser.email,
          username: authUser.username,
          accessToken,
        }),
        { httpOnly: true, secure: true, maxAge: [1, "hours"], path: "/" }
      );
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
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" }),
  })
);

export default component$(() => {
  const action = useLoginUser();

  return (
    <>
      <h1 class="text-xl">Login</h1>
      <Form class="flex flex-col" action={action}>
        <input type="email" name="email" placeholder="Email" autoFocus />
        {action.value?.failed && (
          <p class="text-red-500">{action.value.fieldErrors?.email}</p>
        )}
        <input type="password" name="password" placeholder="Password" />
        {action.value?.failed && (
          <p class="text-red-500">{action.value.fieldErrors?.password}</p>
        )}
        <p>Forgot password?</p>
        <button type="submit">Log in</button>
        <p>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
        <p>
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </Form>
      {action.value?.failed && (
        <p class="text-red-500">{action.value.message}</p>
      )}
    </>
  );
});
