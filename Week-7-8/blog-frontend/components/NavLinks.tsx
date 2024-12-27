"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const ADMIN_LINKS = [
  { title: "Home", href: "/" },
  { title: "Blogs", href: "/all-blogs" },
  { title: "Categories", href: "/categories" },
  { title: "Users", href: "/users" },
];

const GUEST_LINKS = [
  { title: "Home", href: "/" },
  { title: "Blogs", href: "/blogs" },
];

export default function NavLinks() {
  const { user, token } = useAuth();

  const USER_LINKS = [
    { title: "Home", href: "/" },
    { title: "Blogs", href: "/blogs" },
    { title: "View Profile", href: `/user/${user?._id}` },
  ];

  let activeLinks = GUEST_LINKS;
  if (token) activeLinks = USER_LINKS;
  if (token && user?.role === "admin") activeLinks = ADMIN_LINKS;

  return activeLinks.map((link, index) => (
    <Link className="nav-links" href={link.href} key={index}>
      {link.title}
    </Link>
  ));
}
