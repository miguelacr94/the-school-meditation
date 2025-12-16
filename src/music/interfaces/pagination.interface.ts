export interface MusicItem {
  _id: string;
  name: string;
  description: string;
  position: number;
  favorites: string[];
  audioFilename: string;
  imageFilename: string;
  categories: string[];
  isPremium: boolean;
  typeContent: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  plays?: number;
  order?: number;
  active?: boolean;
}

export interface GuidedMeditationPage {
  musicList: MusicItem[];
  isPremium: boolean;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
