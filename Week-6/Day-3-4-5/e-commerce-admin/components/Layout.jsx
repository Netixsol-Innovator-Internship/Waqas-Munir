import { auth, signIn } from "@/auth";
import Nav from "@/components/Nav";

export default async function Layout({ children }) {
  const session = await auth();

  return !session ? (
    <div className="bg-blue-900 w-screen min-h-screen flex items-center">
      <div className="w-full text-center">
        <form
          action={async () => {
            "use server";

            await signIn("google");
          }}
        >
          <button className="bg-white p-2 px-4 text-black rounded-lg">
            Login with Google
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 p-4 rounded-lg mb-2 text-black">
        {children}
      </div>
    </div>
  );
}
