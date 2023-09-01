import { component$ } from "@builder.io/qwik";

interface FooterProps {
  translucid?: boolean;
}

export default component$<FooterProps>(({ translucid = true }) => {
  return (
    <footer
      class={`grid grid-cols-1 md:grid-cols-4 gap-3 ${
        translucid && "text-white"
      } py-4 relative ${translucid && "bg-white/10"}`}
    >
      <ul class="flex flex-col">
        <li class={`${translucid && "drop-shadow"}`}>Terms</li>
        <li class={`${translucid && "drop-shadow"}`}>Privacy</li>
        <li class={`${translucid && "drop-shadow"}`}>Impressum</li>
      </ul>
      <ul class="flex flex-col">
        <li class={`${translucid && "drop-shadow"}`}>Twitter</li>
        <li class={`${translucid && "drop-shadow"}`}>Facebook</li>
        <li class={`${translucid && "drop-shadow"}`}>LinkedIn</li>
      </ul>
      <ul class="flex flex-col">
        <li class={`${translucid && "drop-shadow"}`}>About</li>
        <li class={`${translucid && "drop-shadow"}`}>Contact</li>
        <li class={`${translucid && "drop-shadow"}`}>Help</li>
      </ul>
      <ul class="flex flex-col justify-center">
        <li class="drop-shadow">
          © {new Date().getFullYear()} Tagtree. All rights reserved.
        </li>
      </ul>
    </footer>
  );
});
