import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import SignInButton from "./LogInButton";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        console.log(session?.user);
        setUser(session?.user || null);
      });

      return () => {
        data.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen max-w-screen-lg font-[family-name:var(--font-geist-sans)] mx-auto px-10`}>
      <nav className="flex justify-between w-full py-4 border-b border-gray-200 mb-16">
        <Link
          href="/"
          className="text-2xl font-bold block"
          aria-label="VotesApp Logo">
          VotesApp
        </Link>

        {!user ? <SignInButton /> : <MenuDropdown />}
      </nav>

      {children}
    </div>
  );
};

export default Layout;
