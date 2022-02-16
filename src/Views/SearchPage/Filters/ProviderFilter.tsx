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
  return (
    <section>
      <div className='filters__providers'>
        <CustomSelect
          isMultiple
          checkedArray={filterOfProviders.filter((provider) => provider.isApplied).map((prov) => providerList.find((item) => prov.id === item.provider_id)!.provider_name)}
          variants={providerList.map((provider) => provider.provider_name)}
          placeholder='providers'
          handleMultipleSelect={(value: string[]) => {
            updateFieldChanged(value);
          }}
        />
        {/* {providerList.map((provider) => (
          <div key={provider.provider_id}>
            {provider.provider_name}
            <input
              checked={filterOfProviders.find((filter) => provider.provider_id === filter.id)?.isApplied}
              type='checkbox'
              onChange={(e) => updateFieldChanged(filterOfProviders, provider.provider_id, e.target.checked)}
            />
            <img src={provider.logo_path} alt='' />
          </div>
        ))} */}
      </div>
    </section>
  );
}
