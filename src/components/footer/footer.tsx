import { component$ } from "@builder.io/qwik";

interface FooterProps {
  translucid?: boolean;
}

export default component$<FooterProps>(({ translucid = true }) => {
  return (
    <footer
      class={`${translucid && "text-white"} py-4 relative ${translucid && "bg-white/10"}`}
    >
      <div class="grid grid-cols-3 md:grid-cols-4 gap-3 max-w-[1274px] mx-auto w-full px-4">
        <ul class="flex flex-col md:items-start">
          <li class={`${translucid && "drop-shadow"}`}>Terms</li>
          <li class={`${translucid && "drop-shadow"}`}>Privacy</li>
          <li class={`${translucid && "drop-shadow"}`}>Impressum</li>
        </ul>
        <ul class="flex flex-col md:items-start">
          <li class={`${translucid && "drop-shadow"}`}>Twitter</li>
          <li class={`${translucid && "drop-shadow"}`}>Facebook</li>
          <li class={`${translucid && "drop-shadow"}`}>LinkedIn</li>
        </ul>
        <ul class="flex flex-col md:items-start">
          <li class={`${translucid && "drop-shadow"}`}>About</li>
          <li class={`${translucid && "drop-shadow"}`}>Contact</li>
          <li class={`${translucid && "drop-shadow"}`}>Help</li>
        </ul>
        <ul class="flex flex-col justify-end text-xs col-span-3 md:col-span-1">
          <li class="drop-shadow">
            © {new Date().getFullYear()} Tagtree. All rights reserved.
          </li>
        </ul>
      </div>
    </footer>
  );
});
