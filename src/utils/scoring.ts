import { Bid, Level, Suit, Team } from "../types/game";

// Legacy suit mapping for backwards compatibility
const LEGACY_SUIT_MAP: Record<string, Suit> = {
  'Spades': '♠️',
  'Clubs': '♣️', 
  'Diamonds': '♦️',
  'Hearts': '♥️',
  'No-Trump': 'No-Trump',
  'Misere': 'Misere',
  'Open Misere': 'Open Misere'
};

const BASE_SCORES: Record<Suit, number> = {
  "♠️": 40,
  "♣️": 60,
  "♦️": 80,
  "♥️": 100,
  "No-Trump": 120,
  "Misere": 250,
  "Open Misere": 500,
};

// Helper function to normalize suit (for backwards compatibility)
const normalizeSuit = (suit: string): Suit => {
  if (suit in LEGACY_SUIT_MAP) {
    return LEGACY_SUIT_MAP[suit];
  }
  return suit as Suit;
};

const OPPOSITION_HAND_POINTS = 10;

export const teamName = (team: Team) => {
  return team.players.join(" & ");
};

export const calculateBidPoints = (level: Level | null, suit: Suit): number => {
  const normalizedSuit = normalizeSuit(suit);
  
  if (normalizedSuit === "Misere" || normalizedSuit === "Open Misere") {
    return BASE_SCORES[normalizedSuit];
  }

  if (!level) return 0;
  const baseScore = BASE_SCORES[normalizedSuit];
  if (baseScore === undefined) {
    console.warn(`Unknown suit: ${suit}, normalized: ${normalizedSuit}`);
    return 0;
  }
  const levelDiff = level - 6;
  return baseScore + levelDiff * 100;
};

export const calculateRoundScore = (bid: Bid): [number, number] => {
  const normalizedSuit = normalizeSuit(bid.suit);
  const bidPoints = calculateBidPoints(bid.level, bid.suit);
  const oppositionPoints = bid.level
    ? (10 - bid.tricksWon) * OPPOSITION_HAND_POINTS
    : 0;
  const level = bid.level || 0;
  // Calculate bidding team's score

  if (normalizedSuit === "Misere" || normalizedSuit === "Open Misere") {
    return bid.tricksWon === 0 ? [bidPoints, 0] : [-bidPoints, 0];
  }

  const biddingTeamScore = bid.tricksWon >= level ? bidPoints : -bidPoints;

  // Calculate non-bidding team's score (they always get points for tricks)
  const nonBiddingTeamScore = oppositionPoints;

  return [biddingTeamScore, nonBiddingTeamScore];
};

export const isGameOver = (scores: number[]): [boolean, number] => {
  const winningTeam = scores.findIndex((score) => score >= 500);
  if (winningTeam !== -1) return [true, winningTeam];

  const losingTeam = scores.findIndex((score) => score <= -500);
  if (losingTeam !== -1) return [true, losingTeam === 0 ? 1 : 0];

  return [false, -1];
};
