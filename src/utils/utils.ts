import { SearchDataType } from '../types';

export const formatSearchData = (searchData: SearchDataType, searchKey?: string) => {
  return {
    q: searchKey,
    categories: ['general', 'anime', 'people']
      .map((d: any) => Number(searchData.categories?.includes(d)))
      .join(''),
    purity:
      ['sfw', 'sketchy'].map((d: any) => Number(searchData.purity?.includes(d))).join('') + '0',
    sorting: searchData.sorting?.[0],
    atleast: searchData.atleast?.[0],
  };
};
