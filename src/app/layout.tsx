import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Godcraft - Ultimate Minecrafting Experience",
  description: "Your friendly neighborhood Minecraft community. We are building the next generation builds in minecraft. Here you will find details related to our technical server and anything that we build and also you can join our discord server.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
