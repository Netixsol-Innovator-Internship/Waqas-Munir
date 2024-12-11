"use client";

import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between items-center">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="rounded-full overflow-hidden">
          <img src={session?.user?.image} alt="" className="w-10 h-10" />
        </div>
      </div>
    </Layout>
  );
}
