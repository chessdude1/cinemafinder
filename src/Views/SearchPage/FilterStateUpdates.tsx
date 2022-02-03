import { SearchPageActions } from '../../redux/SearchPageRedux/SearchPageActions';
import { IGenre, providerFilter, watchProvider } from './SearchQueryTypes';

export function updateFilterGenresState(filter: IGenre[]) {
  const genres = filter
    .map((obj) => {
      if (obj.applied === true) {
        return obj.id;
      }
      return null;
    })
    .filter((obj) => obj !== null)
    .join(',');
  return SearchPageActions.UpdateGenresFilter(genres);
}
export function updateFilterYearsState(filter: number[]) {
  return SearchPageActions.UpdateYearsFilter(filter);
}
export function updateFilterRatingsState(filter: number[]) {
  return SearchPageActions.UpdateRatingFilter(filter);
}
export function updateFilterProvidersState(filter: providerFilter[]) {
  const providersStr = filter
    .map((item) => (item.isApplied ? item.id : null))
    .filter((obj) => obj !== null)
    .join(',');
  return SearchPageActions.UpdateProvidersFilter(providersStr);
}
export function updateSortOrderState(filter: string) {
  return SearchPageActions.UpdateSortOrder(filter);
}
