// ──────────────────────────────────────────────
//  TypeScript interfaces for the prediction hub
// ──────────────────────────────────────────────

export interface Player {
  id: string;
  name: string;
  shortName: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  number: number;
  club: string;
  avatarUrl: string;
}

export interface H2HRecord {
  year: number;
  stage: string;
  venue: string;
  teamAScore: number;
  teamBScore: number;
  winner: 'A' | 'B' | 'D'; // A, B, or Draw
  goals: number;
  highlight: string;
}

export interface TeamForm {
  result: 'W' | 'D' | 'L';
  opponent: string;
  score: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  flag: string;           // emoji flag
  flagCode: string;       // ISO 3166-1 alpha-2 (for flagcdn.com)
  primaryColor: string;
  secondaryColor: string;
  ranking: number;
  group: string;
  coach: string;
  form: TeamForm[];       // last 5 matches
  players: Player[];
  worldCupAppearances: number;
  worldCupWins: number;
}

export interface Match {
  id: string;
  date: string;           // ISO date string
  stadium: string;
  city: string;
  country: string;
  group: string;
  round: string;
  teamA: Team;
  teamB: Team;
  h2hRecords: H2HRecord[];
  funStats: FunStat[];
}

export interface FunStat {
  label: string;
  valueA: string | number;
  valueB: string | number;
  unit?: string;
  icon: string;
}

export interface PredictionState {
  matchId: string;
  scoreA: number;
  scoreB: number;
  goalscorerTeam: 'A' | 'B' | null;
  goalscorerPlayerId: string | null;
  possessionA: number;
  yellowCardsA: number;
  yellowCardsB: number;
  isComplete: boolean;
  isSubmitted: boolean;
}
