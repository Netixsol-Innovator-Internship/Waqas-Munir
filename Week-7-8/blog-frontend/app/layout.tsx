import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ThemeSwitch from "@/components/ThemeSwitch";
import ContextProvider from "@/components/ContextProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Toaster />
          {children}
          <div className="fixed bottom-4 right-4">
            <ThemeSwitch />
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}