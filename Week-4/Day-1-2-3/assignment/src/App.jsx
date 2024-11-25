import { Toaster } from "react-hot-toast";
import Collections from "./components/Collections";
import Community from "./components/Community";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import Navbar from "./components/Navbar";
import NewsLetter from "./components/NewsLetter";
import Partners from "./components/Partners";
import Sale from "./components/Sale";

export default function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Hero />
      <Sale />
      <Highlight />
      <Collections />
      <Community />
      <Sale />
      <Partners />
      <NewsLetter />
      <Footer />
    </>
  );
}
