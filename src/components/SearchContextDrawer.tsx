import { Button, Drawer, DrawerProps, Stack, Toolbar } from "@mui/material";
import MultiSelect from "./common/MultiSelect";
import {
  AtLeastEnum,
  CategoryEnum,
  PurityEnum,
  SearchDataType,
  SortEnum,
  atleasts,
  categories,
  purities,
  sorts,
} from "../types.d";

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
    <Drawer anchor="top" {...drawerProps}>
      <Toolbar />
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent={"center"}
        sx={{
          width: "100%",
          p: 1,
        }}
      >
        <MultiSelect<keyof typeof CategoryEnum>
          label="壁纸类型"
          items={categories.map((category: keyof typeof CategoryEnum) => ({
            label: CategoryEnum[category],
            value: category,
          }))}
          value={searchData.categories}
          onChange={(categories) => onDataChange?.({ categories })}
        />
        <MultiSelect<keyof typeof PurityEnum>
          label="壁纸级别"
          items={purities.map((purity) => ({
            label: PurityEnum[purity],
            value: purity,
          }))}
          value={searchData.purity}
          onChange={(purity) => onDataChange?.({ purity })}
        />
        <MultiSelect<keyof typeof SortEnum>
          label="排序规则"
          items={sorts.map((sort) => ({
            label: SortEnum[sort],
            value: sort,
          }))}
          exclusive
          value={searchData.sorting?.[0]}
          onChange={(sorting) => onDataChange?.({ sorting })}
        />
        <MultiSelect<keyof typeof AtLeastEnum>
          label="分辨率"
          items={atleasts.map((atleast) => ({
            label: AtLeastEnum[atleast],
            value: atleast,
          }))}
          exclusive
          value={searchData.atleast?.[0]}
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
