export interface sortOrderTypes {
  titleAsc: boolean;
  titleDesc: boolean;
  rating: boolean;
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
  isApplied: boolean;
}
