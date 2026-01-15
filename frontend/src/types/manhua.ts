export type ManhuaItem = {
  id: string;
  name: string;
  description: string;
  totalChapters: number;
  currentChapter: number;
  status: string;
  favorite: boolean;
};

export type StatItem = {
  label: string;
  value: string;
  trend: string;
};
