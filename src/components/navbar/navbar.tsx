import { component$ } from "@builder.io/qwik";
import Logout from "../logout/logout";
import { Link } from "@builder.io/qwik-city";

interface NavbarProps {
  userName?: string;
}

export default component$<NavbarProps>(({ userName }) => {
  return (
    <nav class="bg-gray-800 text-white py-4 px-3 mb-6 grid grid-cols-12 2xl:px-0">
      <div class="col-span-full 2xl:col-start-2 2xl:col-end-12 text-right flex items-center">
        <Link href="/" class="mr-auto tagtree-font text-2xl text-white">
          Tagtree
        </Link>
        {userName && (
          <div>
            Welcome <b class="text-violet-300">{userName}</b> (
            <Logout />)
          </div>
        )}
      </div>
    </nav>
  );
});
