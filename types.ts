
export interface KolStats {
  rank: number;
  pnlSol: string;
  pnlUsd?: string;
  winRate: string;
  positions: { total: number; win: number; loss: number };
  trades: { total: number; win: number; loss: number };
  volume: string;
  avgHoldTime: string;
}

export interface Fanfic {
  title: string;
  content: string;
}

export interface KolData {
  id: string;
  name: string;
  handle: string; // @handle
  twitterUrl: string;
  avatarUrl: string; // Updated from seed to specific URL
  stats: KolStats;
  joinDate: string;
  location?: string;
  intro: string;
  career: string;
  uniqueDescription: string;
  details: string;
  fanfics: Fanfic[];
  tags: string[];
}

export enum ViewState {
  HOME = 'HOME',
  RANKING = 'RANKING',
  ARTICLE = 'ARTICLE',
}
