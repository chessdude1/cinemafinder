import { watchProvidersBaseUrls } from '../Assets/watchProvidersBaseUrls';

export function generateLinkToMovie(movieName : string | undefined, watchProviderId : number) : string {
  let link = '';
  if (watchProvidersBaseUrls[watchProviderId].includes('search')
  || watchProvidersBaseUrls[watchProviderId].includes('query')) {
    link += watchProvidersBaseUrls[watchProviderId];
    link += movieName;
  } else {
    link = watchProvidersBaseUrls[watchProviderId];
  }
  return link;
}
