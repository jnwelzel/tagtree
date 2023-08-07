import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <h1 class="text-xl">Create an account</h1>
      <form class="flex flex-col">
        <input type="text" name="email" placeholder="Email" />
        <input
          type="text"
          name="username"
          placeholder="tagtree.link/ Username"
        />
        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          class="form-checkbox rounded text-pink-500"
        />
        <label for="newsletter">Newsletter</label>
        <button type="submit">Create account</button>
      </form>
    </>
  );
});
