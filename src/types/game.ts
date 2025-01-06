export type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs' | 'No-Trump' | 'Misere' | 'Open Misere';
export type Level = 6 | 7 | 8 | 9 | 10;

export interface Team {
  id: number;
  icon: string;
  score: number;
  players: string[];
}

export interface Bid {
  level: Level | null;
  suit: Suit;
  team: Team;
  tricksWon: number;
}

export interface Round {
  id: number;
  bid: Bid;
  timestamp: number;
  biddingTeamScore: number;
  nonBiddingTeamScore: number;
}