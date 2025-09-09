export type Review = {
  id?: number;
  rating: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  memberName?: string;
  favCount?: number;
};

export type Config = {
  headers: { Authorization: string };
};
