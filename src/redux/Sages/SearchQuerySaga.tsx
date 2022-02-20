import { CropLandscapeOutlined } from '@mui/icons-material';
import { put, select, takeLatest } from '@redux-saga/core/effects';
import { getMovieByQuery, getWatchProviders } from '../../Services/Service';
import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';
import { currentLanguage } from '../AuthPageRedux/AuthPageReducer';
import { Movie } from '../SearchPageRedux/SearchPageActions';
import { QueriedMovie, SearchQueryActions } from '../SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { RootState } from '../store';

export enum SearchQuerySagaTypes {
  FETCH_QUERY_SAGA = 'FETCH_QUERY_SAGA',
  FETCH_QUERY_PROVIDERS_SAGA = 'FETCH_QUERY_PROVIDERS_SAGA',
}
function* workerFetchQuery(action: { type: SearchQuerySagaTypes; payload: string }) {
  const movies: Movie[] = yield getMovieByQuery(action.payload, currentLanguage);
  yield put(SearchQueryActions.FetchQueried(movies));
}

function* workerFetchQueryWithProviders() {
  const storeSaga: RootState = yield select((store) => store);
  const { movies } = storeSaga.SearchQueryReducer;
  yield put(SearchQueryActions.CleanQueryPage());
  for (let i = 0; i < movies.length; i += 1) {
    const watchProviders: ListOfWatchProvidersType = yield getWatchProviders(movies[i].id.toString());
    const queried: QueriedMovie = {
      title: movies[i].title,
      id: movies[i].id,
      backdropPath: movies[i].backdrop_path,
      genres: movies[i].genre_ids,
      originalLanguage: movies[i].original_language,
      originalTitle: movies[i].original_title,
      posterPath: movies[i].poster_path,
      popularity: movies[i].popularity,
      watchProviders,
      releaseDate: movies[i].release_date,
      voteAverage: movies[i].vote_average,
    };
    yield put(SearchQueryActions.FetchQueriedWithProviders(queried));
  }
}

export function* watchFetchQuery() {
  yield takeLatest(SearchQuerySagaTypes.FETCH_QUERY_SAGA, workerFetchQuery);
}
export function* watchFetchQueryWithProviders() {
  yield takeLatest(SearchQuerySagaTypes.FETCH_QUERY_PROVIDERS_SAGA, workerFetchQueryWithProviders);
}
