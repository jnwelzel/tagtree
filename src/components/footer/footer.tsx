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
        <li>Terms</li>
        <li>Privacy</li>
        <li>Impressum</li>
      </ul>
      <ul class="flex flex-col">
        <li>Twitter</li>
        <li>Facebook</li>
        <li>LinkedIn</li>
      </ul>
      <ul class="flex flex-col">
        <li>About</li>
        <li>Contact</li>
        <li>Help</li>
      </ul>
      <ul class="flex flex-col justify-center">
        <li>© {new Date().getFullYear()} Tagtree. All rights reserved.</li>
      </ul>
    </footer>
  );
});
