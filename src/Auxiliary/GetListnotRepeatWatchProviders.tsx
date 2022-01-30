import { ListOfWatchProvidersType, onlineCinema } from '../Services/ServiceTypes';

export function GetListnotRepeatWatchProviders(watchProviders
  : ListOfWatchProvidersType | undefined) : Array<string> {
  if (!watchProviders) {
    return [''];
  }
  const notRepeatWatchProviders : Array<string> = [];
  Object.entries(watchProviders).forEach((watchProvider: [string, Array<onlineCinema>]) => {
    watchProvider[1].forEach((currentOnlineCinema) => {
      notRepeatWatchProviders.push(currentOnlineCinema.provider_name);
    });
  });
  return Array.from(new Set(notRepeatWatchProviders));
}
