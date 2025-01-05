import React from "react";
import PollCard from "./PollCard";

const PollGrid = ({ title, polls }: { title: string; polls: string[] }) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl mb-4">{title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {polls.map(poll => (
          <PollCard id={"poll"} key={poll} />
        ))}
      </div>
    </section>
  );
};

export default PollGrid;
