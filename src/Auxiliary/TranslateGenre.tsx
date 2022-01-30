export function TranslateGenre(genres : Array<{id: number, name : string}> | undefined) {
  if (!genres) {
    return [];
  }
  const Genres : genresStringTypes = {
    Action: 'Экшен',
    Adventure: 'приключения',
    Animation: 'Мультфильмы',
    Comedy: 'Комедия',
    Crime: 'Криминал',
    Documentary: 'Документальное',
    Drama: 'Драма',
    Family: 'Семейное',
    Fantasy: 'Фантастика',
    History: 'Историческое',
    Horror: 'Ужасы',
    Music: 'Мюзикл',
    Mystery: 'Мистика',
    Romance: 'Романтика',
    ScienceFiction: 'Научная фантастика',
    Thriller: 'Триллер',
    War: 'Военное',
    Western: 'Вестерн',
  };
  const translatedGenres : Array<string> = [];
  genres.forEach((genre) => translatedGenres.push(Genres[genre.name].toLowerCase()));
  return translatedGenres;
}

interface genresStringTypes {
  [Action : string]: string,
  Adventure: 'приключения',
  Animation: 'Мультфильмы',
  Comedy: 'Комедия',
  Crime: 'Криминал',
  Documentary: 'Документальное',
  Drama: 'Драма',
  Family: 'Семейное',
  Fantasy: 'Фантастика',
  History: 'Историческое',
  Horror: 'Ужасы',
  Music: 'Мюзикл',
  Mystery: 'Мистика',
  Romance: 'Романтика',
  ScienceFiction: 'Научная фантастика',
  Thriller: 'Триллер',
  War: 'Военное',
  Western: 'Вестерн',
}
