import ViewPoll from "@/components/ViewPoll";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";
import ErrorMessage from "@/components/ErrorMessage";
import polls from "@/helpers";
import { useRouter } from "next/router";

const Page = () => {
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

  const { query } = useRouter();
  const poll = polls.find(poll => poll.id === query.id);

  return !user ? (
    <ErrorMessage />
  ) : poll ? (
    <ViewPoll poll={poll} />
  ) : (
    <p>Poll not found.</p>
  );
};

export default Page;
