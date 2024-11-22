import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="bg-primaryBg w-full min-h-screen flex justify-center items-center">
      <Toaster />
      <section className="bg-secondaryBg md:w-2/5 w-[90%] shadow-lg">
        <Header />
        <TodoList />
        <Footer />
      </section>
    </main>
  );
}
