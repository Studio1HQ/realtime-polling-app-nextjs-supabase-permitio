import React, { useEffect, useState } from "react";
import ViewPoll from "@/components/ViewPoll";
import ErrorMessage from "@/components/ErrorMessage";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      });

      return () => {
        data.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !user ? <ErrorMessage /> : <ViewPoll />;
};

export default Page;
