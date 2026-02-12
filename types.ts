
export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  iframeUrl: string;
  category: string;
  description: string;
  isHot?: boolean;
}

export type Category = 'All' | 'Action' | 'Puzzle' | 'Sports' | 'Arcade' | 'Strategy';
