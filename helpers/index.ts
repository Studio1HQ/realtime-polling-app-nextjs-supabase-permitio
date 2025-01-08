export type VoteProps = {
  id: string;
  poll_id: string;
  user_id: string;
  created_at: string;
  option_id: string;
};

export type PollProps = {
  id: string;
  question: string;
  expires_at: string;
  creator_name: string;
  created_by: string;
  votes: {
    count: number;
  }[];
};

type OptionProps = {
  id: string;
  text: string;
  votes: {
    count: number;
  }[];
};

export type ViewPollProps = {
  id: string;
  question: string;
  created_by: string;
  created_at: string;
  expires_at: string;
  active: boolean;
  creator_name: string;
  options: OptionProps[];
};

/**
 * Calculate total votes for a poll.
 * @param options - Array of options with their votes.
 * @returns Total number of votes.
 */
export const calculateTotalVotes = (options: OptionProps[]): number => {
  return options.reduce((total, option) => total + option.votes[0].count, 0);
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
