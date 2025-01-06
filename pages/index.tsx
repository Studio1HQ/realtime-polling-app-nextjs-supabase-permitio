import AllPolls from "@/components/AllPolls";
import polls from "@/helpers";

export default function Home() {
  return (
    <main>
      <header className="mb-8">
        <h1 hidden>
          Welcome to <span className="text-2xl font-bold">VotesApp</span>
        </h1>
      </header>

      <AllPolls title="Active Polls" polls={polls} />

      <AllPolls title="Past Polls" polls={polls} />
    </main>
  );
}
