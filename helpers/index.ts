export type OptionProps = {
  id: string;
  poll_id: string;
  text: string;
  votes: number; // remove
};

export type VoteProps = {
  id: string;
  poll_id: string;
  user_id: string;
  created_at: string;
  option_id: string;
};

export type PollProps = {
  id: string;
  created_at: string;
  created_by: string;
  active: boolean;
  question: string;
  expires_at: string;
  options: OptionProps[];
  votes: {
    count: string;
  }[];
};

/**
 * Calculate total votes for a poll.
 * @param options - Array of options with their votes.
 * @returns Total number of votes.
 */
export const calculateTotalVotes = (options: OptionProps[]): number => {
  return options.reduce((total, option) => total + option.votes, 0);
};

/**
 * Get the countdown time until the poll expires.
 * @param expiresAt - Expiry date in ISO string format.
 * @returns Countdown string (e.g., "1w left", "3d left", "45m left").
 */
export const getCountdown = (expiresAt: string): string => {
  const now = new Date();
  const expiryDate = new Date(expiresAt);
  const diffMs = expiryDate.getTime() - now.getTime();

  if (diffMs <= 0) return "Expired";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    return `${weeks}w left`;
  } else if (days > 0) {
    return `${days}d left`;
  } else if (hours > 0) {
    return `${hours}h left`;
  } else {
    return `${minutes}m left`;
  }
};

// Create dummy data
const polls: PollProps[] = [
  {
    id: "1",
    title: "What is your favorite programming language?",
    type: "single-choice",
    options: [
      { id: "opt1", text: "JavaScript", votes: 10 },
      { id: "opt2", text: "Python", votes: 15 },
      { id: "opt3", text: "Java", votes: 8 },
      { id: "opt4", text: "C++", votes: 5 },
    ],
    createdAt: "2025-01-01T10:00:00Z",
    expiresAt: "2025-01-06T02:00:00Z",
  },
  {
    id: "2",
    title: "Which of these features do you prioritize in a smartphone?",
    type: "multi-choice",
    options: [
      { id: "opt1", text: "Battery Life", votes: 20 },
      { id: "opt2", text: "Camera Quality", votes: 18 },
      { id: "opt3", text: "Processing Speed", votes: 12 },
      { id: "opt4", text: "Screen Size/Quality", votes: 14 },
    ],
    createdAt: "2025-01-02T12:30:00Z",
    expiresAt: "2025-01-12T12:30:00Z",
  },
  {
    id: "3",
    title: "Rate your experience with our customer support.",
    type: "rating",
    options: [
      { id: "opt1", text: "1 - Very Poor", votes: 2 },
      { id: "opt2", text: "2 - Poor", votes: 5 },
      { id: "opt3", text: "3 - Average", votes: 10 },
      { id: "opt4", text: "4 - Good", votes: 20 },
      { id: "opt5", text: "5 - Excellent", votes: 30 },
    ],
    createdAt: "2025-01-03T15:00:00Z",
    expiresAt: "2025-01-15T15:00:00Z",
  },
];

export default polls;
