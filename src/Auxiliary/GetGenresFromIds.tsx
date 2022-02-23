import { genresIdsList } from '../Assets/genresIdsList';
import { TranslateGenre } from './TranslateGenre';

export function GetGenresFromIds(genresIds : Array<number>) : Array<{id: number, name : string}> {
  const genresNames : Array<{id: number, name : string}> = [];

  genresIds.forEach((genreId) => {
    genresNames.push({
      id: genreId,
      name: genresIdsList[genreId],
    });
  });
  return genresNames;
}
