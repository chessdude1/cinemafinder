import React from 'react';
import { providerFilter, watchProvider } from '../SearchQueryTypes';

export interface ProviderFilterType {
  setFilterOfProviders: React.Dispatch<React.SetStateAction<providerFilter[]>>;
  filterOfProviders: providerFilter[];
  providerList: watchProvider[];
}
export function ProviderFilter({ setFilterOfProviders, filterOfProviders, providerList }: ProviderFilterType) {
  function updateFieldChanged(prev: providerFilter[], id: number, isApplied: boolean) {
    const newArr = prev.map((obj) => {
      if (obj.id !== id) {
        return obj;
      }
      return { id, isApplied };
    });
    setFilterOfProviders(newArr);
  }
  return (
    <section>
      <h2>Providers</h2>
      <div className='filters__providers'>
        {providerList.map((provider) => (
          <div key={provider.provider_id}>
            {provider.provider_name}
            <input
              checked={filterOfProviders.find((filter) => provider.provider_id === filter.id)?.isApplied}
              type='checkbox'
              onChange={(e) => updateFieldChanged(filterOfProviders, provider.provider_id, e.target.checked)}
            />
            <img src={provider.logo_path} alt='' />
          </div>
        ))}
      </div>
    </section>
  );
}
