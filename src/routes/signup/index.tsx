import { component$, useSignal } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { addUser } from "./helper";
import { getErrorMessage } from "~/utils/errorHandling";
import CookiesEnum from "~/utils/CookiesEnum";
import { EndpointEnum } from "~/utils/api";
import { Link } from "~/components/link/link";
import Navbar from "~/components/navbar/navbar";

export const onRequest: RequestHandler = async ({ redirect, cookie }) => {
  if (cookie.has(CookiesEnum.Session)) {
    throw redirect(308, "/admin");
  }
};

export const useAddUser = routeAction$(
  async (user, { fail, redirect }) => {
    try {
      // Persist User
      await addUser({
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth.toISOString().split("T")[0],
        email: user.email,
        userName: user.userName,
        newsletter: (user.newsletter ?? "") === "on",
        password: user.password,
      });
    } catch (error) {
      return fail(400, {
        message: getErrorMessage(error),
      });
    }

    return { success: true };
  },
  zod$({
    firstName: z
      .string()
      .min(2, { message: "Must be at least 2 characters long" }),
    lastName: z
      .string()
      .min(2, { message: "Must be at least 2 characters long" }),
    dateOfBirth: z.coerce.date(),
    email: z.string().email({ message: "Invalid email address" }),
    userName: z.string(),
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" }),
    newsletter: z.string().nullish(),
  })
);

export default component$(() => {
  const action = useAddUser();
  const showSuccess = useSignal(false);

  return (
    <div class="flex flex-col min-h-full">
      <Navbar />
      <div class="flex-1 px-3 md:px-0 md:w-96 ml-auto mr-auto justify-center flex flex-col">
        {showSuccess.value ? (
          <div>
            You have been successfully registered!{" "}
            <Link href="/login" underline>
              Log in
            </Link>
            .
          </div>
        ) : (
          <>
            <h1 class="text-xl text-center mb-3">Create an account</h1>
            <Form
              class="grid grid-cols-1 gap-3 p-5 border bg-white rounded-md drop-shadow-md"
              action={action}
              onSubmitCompleted$={() => (showSuccess.value = true)}
            >
              <label class="flex flex-col">
                First name
                <input type="text" name="firstName" autoFocus />
                {action.value?.failed && (
                  <p class="text-red-500">
                    {action.value.fieldErrors?.firstName}
                  </p>
                )}
              </label>
              <label class="flex flex-col">
                Last name
                <input type="text" name="lastName" />
                {action.value?.failed && (
                  <p class="text-red-500">
                    {action.value.fieldErrors?.lastName}
                  </p>
                )}
              </label>
              <label class="flex flex-col">
                Birth date
                <input type="date" name="dateOfBirth" />
              </label>
              <label class="flex flex-col">
                E-mail
                <input type="email" name="email" />
                {action.value?.failed && (
                  <p class="text-red-500">{action.value.fieldErrors?.email}</p>
                )}
              </label>
              <label class="flex flex-col">
                Username
                <input
                  type="text"
                  name="userName"
                  placeholder="tagtree.link/@username"
                />
              </label>
              <label class="flex flex-col">
                Password
                <input type="password" name="password" />
                {action.value?.failed && (
                  <p class="text-red-500">
                    {action.value.fieldErrors?.password}
                  </p>
                )}
              </label>
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
                By clicking <b>Create account</b>, you agree to Tagtree's Terms
                and Conditions and confirm you have read our Privacy Notice.
              </p>
              <button
                type="submit"
                class="rounded-full bg-violet-400 text-white px-4 py-2 font-medium mb-3"
              >
                Create account
              </button>
              <p class="text-sm">
                Already have an account?{" "}
                <Link href="/login" underline>
                  Log in
                </Link>
              </p>
              <p class="text-sm">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </Form>
          </>
        )}
      </div>
      <div class="flex-1">Footer</div>
    </div>
  );
});
