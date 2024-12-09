import { auth } from "@/auth";
import Layout from "@/components/Layout";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between items-center">
        <h2>
          Hello, <span className="font-semibold">{session.user.name}</span>
        </h2>
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          alt="Your Image"
        />
      </div>
    </Layout>
  );
}
