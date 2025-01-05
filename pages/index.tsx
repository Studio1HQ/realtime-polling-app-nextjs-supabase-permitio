import PollCard from "@/components/PollCard";

export default function Home() {
  return (
    <main>
      <header className="mb-8">
        <h1 hidden>
          Welcome to <span className="text-2xl font-bold">VotesApp</span>
        </h1>
      </header>

      <section className="mb-16">
        <h2 className="text-2xl mb-4">Active Polls</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map(poll => (
            <PollCard id={"poll"} key={poll} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl mb-4">Past Polls</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map(poll => (
            <PollCard id={"poll"} key={poll} />
          ))}
        </div>
      </section>
    </main>
  );
}
