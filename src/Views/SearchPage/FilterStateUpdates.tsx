import { FiltersType, SearchPageActions } from '../../redux/SearchPageRedux/SearchPageActions';
import { IGenre, providerFilter, watchProvider } from './SearchQueryTypes';

export function sendUpdateFilterState(filtersState: FiltersType, order: string, filterOfProviders: providerFilter[], filterOfRatings: number[], filterOfYears: number[], filterOfGenres: IGenre[]) {
  const genres = filterOfGenres
    .map((obj) => {
      if (obj.isApplied === true) {
        return obj.id;
      }
      return null;
    })
    .filter((obj) => obj !== null)
    .join(',');
  const providersStr = filterOfProviders
    .map((item) => (item.isApplied ? item.id : null))
    .filter((obj) => obj !== null)
    .join('+');
  return SearchPageActions.UpdateFiltersState({ ...filtersState, sortOrder: order, providers: providersStr, genre: genres, rating: filterOfRatings, year: filterOfYears });
}

export function getStateFromStore(source: string, array: providerFilter[] | IGenre[]) {
  return array.map((filter) => {
    if (source.split(/[+,]/).includes(filter.id.toString())) {
      return { ...filter, isApplied: true };
    }
    return filter;
  });
}
