import ViewPoll from "@/components/ViewPoll";
import React from "react";
import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import ErrorMessage from "@/components/ErrorMessage";
import polls from "@/helpers";
import { useRouter } from "next/router";

const Page = ({ user }: { user: User }) => {
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
