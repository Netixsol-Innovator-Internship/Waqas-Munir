import Link from "next/link";
import NavActions from "./NavActions";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-darkPrimary text-black dark:text-white px-16 py-4 flex justify-between items-center">
      <div>
        <Link href="/" className="font-logo font-thin text-2xl cursor-pointer">
          Meta <span className="font-semibold">Blog</span>
        </Link>
      </div>
      <div>
        <nav>
          <ul className="flex items-center gap-4">
            <li className="nav-links">Home</li>
            <li className="nav-links">Blogs</li>
            <li className="nav-links">About Us</li>
            <li className="nav-links">Contact Us</li>
          </ul>
        </nav>
      </div>
      <div>
        <NavActions />
      </div>
    </header>
  );
}
