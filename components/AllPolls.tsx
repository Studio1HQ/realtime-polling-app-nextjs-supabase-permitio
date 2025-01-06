import React from "react";
import PollCard from "./PollCard";
import { PollProps } from "@/helpers";

const AllPolls = ({ title, polls }: { title: string; polls: PollProps[] }) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl mb-4">{title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {polls.length > 0 ? (
          polls.map(poll => <PollCard poll={poll} key={poll.id} />)
        ) : (
          <p className="text-gray-500">No polls found.</p>
        )}
      </div>
    </section>
  );
};

export default AllPolls;
