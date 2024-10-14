import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { loginUser, userInfo } from "./helper";
import { getErrorMessage } from "~/utils/errorHandling";
import { EndpointEnum } from "~/utils/api";
import CookiesEnum from "~/utils/CookiesEnum";
import type { SessionCookie } from "../admin";
import { Link } from "~/components/link/link";
import Navbar from "~/components/navbar/navbar";

export const useLoginUser = routeAction$(
  async (userLogin, { fail, cookie, redirect }) => {
    try {
      // User Authentication

      // 1. Get access token
      const { accessToken } = await loginUser({
        email: userLogin.email,
        password: userLogin.password,
      });

      // 2. Get user info through token
      const authUser = await userInfo(accessToken);

      const userData = {
        username: authUser.userName,
        email: authUser.email,
        accessToken,
      } as SessionCookie;

      // 3. Create user session cookie so shared map can retrieve it across server restarts etc
      cookie.set(CookiesEnum.Session, JSON.stringify(userData), {
        httpOnly: true,
        secure: true,
        maxAge: [1, "days"],
        path: "/",
      });
    } catch (error) {
      return fail(400, {
        message: getErrorMessage(error),
      });
    }

    // If success redirect to admin page
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
    <div class="flex flex-col min-h-full">
      <Navbar />
      <div class="flex-1 px-3 md:px-0 md:w-96 ml-auto mr-auto justify-center flex flex-col">
        <h1 class="text-xl text-center mb-3">Welcome back!</h1>
        <Form
          class="grid grid-cols-1 gap-3 p-5 border bg-white rounded-md drop-shadow-md"
          action={action}
        >
          <input type="email" name="email" placeholder="Email" autoFocus />
          {action.value?.failed && (
            <p class="text-red-500">{action.value.fieldErrors?.email}</p>
          )}
          <input type="password" name="password" placeholder="Password" />
          {action.value?.failed && (
            <p class="text-red-500">{action.value.fieldErrors?.password}</p>
          )}
          {action.value?.failed && (
            <p class="text-red-500">{action.value.message}</p>
          )}
          <Link href="/" class="text-sm" underline>
            Forgot password?
          </Link>
          <button
            type="submit"
            class="rounded-full bg-violet-400 text-white px-4 py-2 font-medium"
          >
            Log in
          </button>
          <p class="text-sm">
            Don't have an account?{" "}
            <Link href="/signup" underline>
              Sign up
            </Link>
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
