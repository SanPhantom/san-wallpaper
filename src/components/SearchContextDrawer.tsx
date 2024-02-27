import { Button, Drawer, DrawerProps, Stack, Toolbar } from '@mui/material';
import MultiSelect from './common/MultiSelect';
import {
  AtLeastEnum,
  atleasts,
  categories,
  CategoryEnum,
  CategoryTypeEnum,
  purities,
  PurityEnum,
  PurityTypeEnum,
  SearchDataType,
  SortEnum,
  sorts,
} from '../types.d';

interface ISearchContextProps extends DrawerProps {
  searchData: SearchDataType;
  onDataChange?: (value: SearchDataType) => void;
  onSubmit?: () => void;
}

const SearchContext = ({
  searchData,
  onDataChange,
  onSubmit,
  ...drawerProps
}: ISearchContextProps) => {
  return (
    <Drawer open anchor="top" {...drawerProps}>
      <Toolbar />
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent={'center'}
        sx={{
          width: '100%',
          p: 1,
        }}
      >
        <MultiSelect
          label="壁纸类型"
          items={categories.map((category: keyof typeof CategoryEnum) => ({
            label: CategoryTypeEnum[category],
            value: CategoryEnum[category],
          }))}
          value={searchData.categories}
          onChange={(categories) => onDataChange?.({ categories })}
        />
        <MultiSelect
          label="壁纸级别"
          items={purities.map((purity) => ({
            label: PurityTypeEnum[purity],
            value: PurityEnum[purity],
          }))}
          value={searchData.purity}
          onChange={(purity) => onDataChange?.({ purity })}
        />
        <MultiSelect
          label="排序规则"
          items={sorts.map((sort) => ({
            label: SortEnum[sort],
            value: sort,
          }))}
          exclusive
          value={searchData.sorting}
          onChange={(sorting) => onDataChange?.({ sorting })}
        />
        <MultiSelect
          label="分辨率"
          items={atleasts.map((atleast) => ({
            label: AtLeastEnum[atleast],
            value: atleast,
          }))}
          exclusive
          value={searchData.atleast}
          onChange={(atleast) => onDataChange?.({ atleast })}
        />
        <Button variant="outlined" onClick={onSubmit}>
          检索
        </Button>
      </Stack>
    </Drawer>
  );
};

export default SearchContext;
