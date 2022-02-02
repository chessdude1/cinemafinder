export interface sortOrderTypes {
  titleAsc: boolean;
  titleDesc: boolean;
  rating: boolean;
}

export interface genre {
  id: number;
  name: string;
  applied: boolean;
}

export interface yearFilter {
  start: number;
  end: number;
}

export interface genreFilter {
  genres: genre[];
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
