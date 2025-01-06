import ViewPoll from "@/components/ViewPoll";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";
import ErrorMessage from "@/components/ErrorMessage";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
      });

      return () => {
        data.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  return !user ? <ErrorMessage /> : <ViewPoll />;
};

export default Page;
