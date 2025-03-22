export interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string;
  stargazers_count: number;
  updated_at: string;
}
