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
