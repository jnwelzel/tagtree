import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { addUser } from "./helper";
import { getErrorMessage } from "~/utils/errorHandling";
import CookiesEnum from "~/utils/CookiesEnum";
import { EndpointEnum } from "~/utils/api";

export const useAddUser = routeAction$(
  async (user, { fail, cookie, redirect }) => {
    try {
      // Persist User
      const { accessToken } = await addUser({
        email: user.email,
        username: user.username,
        newsletter: (user.newsletter ?? "") === "on",
        password: user.password,
      });

      // Set session cookie
      cookie.set(
        CookiesEnum.Session,
        JSON.stringify({
          username: user.username,
          email: user.email,
          accessToken,
        }),
        { httpOnly: true, secure: true, maxAge: [1, "hours"], path: "/" }
      );
    } catch (e) {
      return fail(400, {
        message: getErrorMessage(e),
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
        <button type="submit">Create account</button>
      </Form>
      {action.value?.failed && (
        <p class="text-red-500">{action.value.message}</p>
      )}
    </>
  );
});
