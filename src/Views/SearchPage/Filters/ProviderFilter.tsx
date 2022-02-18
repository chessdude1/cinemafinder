import React from 'react';
import { CustomSelect } from '../../../Common/UI/CustomSelect/CustomSelect';
import { providerFilter, watchProvider } from '../SearchQueryTypes';
import { INIT_PROVIDERS_STATE } from './InitialStates';

export interface ProviderFilterType {
  setFilterOfProviders: React.Dispatch<React.SetStateAction<providerFilter[]>>;
  filterOfProviders: providerFilter[];
  providerList: watchProvider[];
}
export function ProviderFilter({ setFilterOfProviders, filterOfProviders, providerList }: ProviderFilterType) {
  function updateFieldChanged(names: string[]) {
    const newArr = providerList.map((provider) => {
      if (!names.includes(provider.provider_name)) {
        return { id: provider.provider_id, isApplied: false };
      }
      return { id: provider.provider_id, isApplied: true };
    });
    setFilterOfProviders(newArr);
  }
  function getAppliedNames(providers: providerFilter[]) {
    const appliedIDs = providers.map((provider) => (provider.isApplied ? provider.id : null)).filter((id) => id);
    const names = appliedIDs.map((id) => {
      const ind = providerList.findIndex((item) => item.provider_id === id);
      return providerList[ind].provider_name;
    });
    return names;
  }
  return (
    <section>
      <div className='filters__providers'>
        <CustomSelect
          isMultiple
          checkedArray={getAppliedNames(filterOfProviders)}
          variants={providerList.map((provider) => provider.provider_name)}
          placeholder='providers'
          handleMultipleSelect={(value: string[]) => {
            updateFieldChanged(value);
          }}
        />
      </div>
    </section>
  );
}
