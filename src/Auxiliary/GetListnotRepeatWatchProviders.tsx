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

export function GetListnotRepeatWatchProvidersWithSaveFields(watchProviders
  : ListOfWatchProvidersType) : Array<onlineCinema> {
  if (!watchProviders) {
    return [];
  }
  const AlreadyUsedProviders: Array<string> = [];
  const notRepeatWatchProviders : Array<onlineCinema> = [];
  Object.entries(watchProviders).forEach((watchProvider: [string, Array<onlineCinema>]) => {
    watchProvider[1].forEach((currentOnlineCinema : onlineCinema) => {
      if (!AlreadyUsedProviders.includes(currentOnlineCinema.provider_name)) {
        AlreadyUsedProviders.push(currentOnlineCinema.provider_name);
        notRepeatWatchProviders.push(
          currentOnlineCinema,
        );
      }
    });
  });
  return Array.from(new Set(notRepeatWatchProviders));
}
