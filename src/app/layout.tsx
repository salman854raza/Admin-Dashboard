import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConditionalSideBar from "./components/CondionalSideBar";
import DataFetching from "@/DataFetching";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Avion",
  description: "Created By Muhammad Shahroz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DataFetching/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       {children}
       <ConditionalSideBar/>
      </body>
    </html>
  );
}
