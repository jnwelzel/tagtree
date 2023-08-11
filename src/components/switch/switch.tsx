import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./switch.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <label class="switch">
      <input type="checkbox" />
      <span class="slider round" />
    </label>
  );
});
