import NewPoll from "@/components/NewPoll";
import AllPolls from "@/components/AllPolls";
import React, { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import polls from "@/helpers";
import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";

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

  return (
    <div>
      {!user ? (
        <ErrorMessage />
      ) : (
        <main>
          <NewPoll />

          <AllPolls title="Your Polls" polls={polls} />
        </main>
      )}
    </div>
  );
};

export default Page;
