import React, { useEffect, useState } from 'react';
import { CustomSearchField } from '../../../Common/UI/CustomSearchField';
import { CustomTextField } from '../../../Common/UI/CustomTextField';

export function SearchQueryAux() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <CustomSearchField
        id='header-search-field'
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder='Movie name'
      />
    </div>
  );
}
