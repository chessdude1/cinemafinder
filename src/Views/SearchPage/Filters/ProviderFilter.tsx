import React from 'react';
import { ADAPTIVE_BREAK_POINT } from '../../../Auxiliary/Constants';
import { CustomLabeledCheckbox } from '../../../Common/UI/CustomLabeledCheckbox/CustomLabeledCheckbox';
import { CustomSelect } from '../../../Common/UI/CustomSelect/CustomSelect';
import { providerFilter, watchProvider } from '../SearchQueryTypes';

export interface ProviderFilterType {
  setFilterOfProviders: React.Dispatch<React.SetStateAction<providerFilter[]>>;
  filterOfProviders: providerFilter[];
  providerList: watchProvider[];
  windowSize: number;
}
export function ProviderFilter({ setFilterOfProviders, filterOfProviders, providerList, windowSize }: ProviderFilterType) {
  function updateFieldChanged(names: string[]) {
    const newArr = providerList.map((provider) => {
      if (!names.includes(provider.provider_name)) {
        return { id: provider.provider_id, name: provider.provider_name, isApplied: false };
      }
      return { id: provider.provider_id, name: provider.provider_name, isApplied: true };
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
      {windowSize > ADAPTIVE_BREAK_POINT ? (
        <CustomSelect
          isMultiple
          checkedArray={getAppliedNames(filterOfProviders)}
          variants={providerList.map((provider) => provider.provider_name)}
          placeholder='Кинотеатры'
          handleMultipleSelect={(value: string[]) => {
            updateFieldChanged(value);
          }}
        />
      ) : (
        <div className='search-page__checkbox-filter'>
          {filterOfProviders.map((provider) => (
            <CustomLabeledCheckbox key={provider.id} isDefaultChecked={provider.isApplied} label={provider.name} onChange={(e) => updateFieldChanged([provider.name])} />
          ))}
        </div>
      )}
    </section>
  );
}
