import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import SignInButton from "./LogInButton";
import SignOutButton from "./LogOutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isLogged = false;

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen max-w-screen-lg font-[family-name:var(--font-geist-sans)] mx-auto`}>
      <nav className="flex justify-between w-full py-4">
        <span className="text-2xl font-bold block" aria-label="VotesApp Logo">
          VotesApp
        </span>

        {!isLogged ? <SignInButton /> : <SignOutButton />}
      </nav>

      {children}
    </div>
  );
};

export default Layout;
