export const sortTypes: string[] = ['popularity.desc', 'popularity.asc', 'release_date.desc', 'release_date.asc', 'original_title.desc', 'original_title.asc'];
export enum SORT_ORDER {
  'popularity.desc' = 'More Popular',
  'popularity.asc' = 'Less Popular',
  'release_date.desc' = 'New first',
  'release_date.asc' = 'Old first',
  'original_title.asc' = 'Alphabet order',
  'original_title.desc' = 'Reverse alphabet order',
}
export interface IGenre {
  id: number;
  name: string;
  isApplied: boolean;
}

export interface yearFilter {
  start: number;
  end: number;
}

export interface genreFilter {
  genres: IGenre[];
}

export interface watchProvider {
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

export interface providerFilter {
  id: number;
  name: string;
  isApplied: boolean;
}
