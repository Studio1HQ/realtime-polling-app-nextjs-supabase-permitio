import NewPoll from "@/components/NewPoll";
import AllPolls from "@/components/AllPolls";
import React from "react";
import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import ErrorMessage from "@/components/ErrorMessage";
import polls from "@/helpers";

const Page = ({ user }: { user: User }) => {
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return {
      props: {
        user: null,
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: data.user,
    },
  };
}
