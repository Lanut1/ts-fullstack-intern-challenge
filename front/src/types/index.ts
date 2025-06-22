export type User = {
  id: number;
  username: string;
  token: string;
};

export type Like = {
  id: number;
  cat_id: string;
  created_at: string;
  user?: User;
};

export interface Cat {
  id: string;
  url: string;
  [key: string]: any;
}
