import Link from "next/link";

export default function page() {
  return (
    <div>
      Dashboard Users
      <ul>
        <li>
          <Link href="/dashboard/user/1">User 1</Link>
        </li>
        <li>
          <Link href="/dashboard/user/2">User 2</Link>
        </li>
        <li>
          <Link href="/dashboard/user/3">User 3</Link>
        </li>
        <li>
          <Link href="/dashboard/user/4">User 4</Link>
        </li>
      </ul>
    </div>
  );
}
