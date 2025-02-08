import React, { useEffect, useState } from "react";
import ViewPoll from "@/components/ViewPoll";
import ErrorMessage from "@/components/ErrorMessage";

const Page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !user ? <ErrorMessage /> : <ViewPoll />;
};

export default Page;
