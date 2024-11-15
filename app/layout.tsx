"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the current route is the login or register page
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/dashboard";

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <GoogleOAuthProvider clientId="79335042925-7ojqii9iciluoj1k15o1ht9jfhqgu5pk.apps.googleusercontent.com">
          {!isAuthPage && <NavBar />}
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
