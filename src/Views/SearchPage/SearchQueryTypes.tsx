export const sortTypes: string[] = ['popularity.desc', 'popularity.asc', 'release_date.desc', 'release_date.asc', 'original_title.desc', 'original_title.asc'];
export enum SORT_ORDER {
  'popularity.desc' = 'Наиболее популярные',
  'popularity.asc' = 'Наименее популярные',
  'release_date.desc' = 'Сначала новые',
  'release_date.asc' = 'Сначала старые',
  'original_title.asc' = 'Алфавитный порядок',
  'original_title.desc' = 'Обратный алфавитынй порядок',
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
