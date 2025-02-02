import { Inter } from "next/font/google";
import "@/app/globals.css";
import Nav from "@/components/Nav";
import type { Metadata } from "next";
import Providers from "@/store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnyTube",
  description: "AnyTube a platform to upload and watch amazing videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
