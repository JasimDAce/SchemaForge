import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchemaForge",
  description: "SchemaForge is a dynamic, intuitive tool designed to visualize and create database schemas with ease. It allows users to visually generate database tables, define fields, and establish relationships between them in a user-friendly, interactive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster position="top-right"/>
        {children}</body>
    </html>
  );
}
