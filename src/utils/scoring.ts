import { Bid, Level, Suit, Team } from '../types/game';

const BASE_SCORES: Record<Suit, number> = {
  'Spades': 40,
  'Hearts': 60,
  'Diamonds': 80,
  'Clubs': 100,
  'No-Trump': 120,
  'Misere': 250,
  'Open Misere': 500
};

const OPPOSITION_HAND_POINTS = 10;

export const teamName = (team: Team) => {
  return team.players.join(' & ');
}

export const calculateBidPoints = (level: Level | null, suit: Suit): number => {
  if (suit === 'Misere' || suit === 'Open Misere') {
    return BASE_SCORES[suit];
  }
  
  if (!level) return 0;
  const baseScore = BASE_SCORES[suit];
  const levelDiff = level - 6;
  return baseScore + (levelDiff * 100);
};

export const calculateRoundScore = (bid: Bid): [number, number] => {
  const bidPoints = calculateBidPoints(bid.level, bid.suit);
  const oppositionPoints = bid.level ? (10 - bid.tricksWon) * OPPOSITION_HAND_POINTS : 0;
  const level = bid.level || 0;
  // Calculate bidding team's score
  const biddingTeamScore = (bid.tricksWon >= level) ? bidPoints : -bidPoints;
  
  // Calculate non-bidding team's score (they always get points for tricks)
  const nonBiddingTeamScore = oppositionPoints;
  
  return [biddingTeamScore, nonBiddingTeamScore];
};

export const isGameOver = (scores: number[]): [boolean, number] => {
  const winningTeam = scores.findIndex(score => score >= 500);
  if (winningTeam !== -1) return [true, winningTeam];
  
  const losingTeam = scores.findIndex(score => score <= -500);
  if (losingTeam !== -1) return [true, losingTeam === 0 ? 1 : 0];
  
  return [false, -1];
};