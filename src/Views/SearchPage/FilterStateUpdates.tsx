import { useDispatch } from 'react-redux';
import { SearchPageActions } from '../../redux/SearchPageRedux/SearchPageActions';
import { genre, providerFilter, watchProvider } from './SearchQueryTypes';

export function updateFilterGenresState(filter: genre[]) {
  return SearchPageActions.UpdateGenresFilter(filter);
}
export function updateFilterYearsState(filter: number[]) {
  return SearchPageActions.UpdateYearsFilter(filter);
}
export function updateFilterRatingsState(filter: number[]) {
  return SearchPageActions.UpdateRatingFilter(filter);
}
export function updateFilterProvidersState(filter: providerFilter[]) {
  return SearchPageActions.UpdateProvidersFilter(filter);
}
export function updateSortOrderState(filter: string) {
  return SearchPageActions.UpdateSortOrder(filter);
}
