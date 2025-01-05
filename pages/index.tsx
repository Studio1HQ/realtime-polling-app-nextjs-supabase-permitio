import PollGrid from "@/components/PollGrid";

export default function Home() {
  return (
    <main>
      <header className="mb-8">
        <h1 hidden>
          Welcome to <span className="text-2xl font-bold">VotesApp</span>
        </h1>
      </header>

      <PollGrid title="Active Polls" polls={["1", "2", "3", "4", "5", "6"]} />

      <PollGrid title="Past Polls" polls={["1", "2", "3", "4", "5", "6"]} />
    </main>
  );
}
