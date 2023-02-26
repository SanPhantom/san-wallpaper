import {
  Box,
  Button,
  Drawer,
  DrawerProps,
  Paper,
  Select,
  Stack,
  ToggleButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCreation, useMemoizedFn, useSetState } from "ahooks";
import React from "react";
import MultiSelect from "./MultiSelect";
import { StyledToggleButtonGroup } from "./StyledComponent";

export type SearchDataType = {
  categories?: ("general" | "anime" | "people")[];
  purity?: ("sfw" | "sketchy")[];
  sorting?: string[];
  atleast?: string[];
};

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
        <MultiSelect<"general" | "anime" | "people">
          label="壁纸类型"
          items={[
            { label: "一般", value: "general" },
            { label: "动漫", value: "anime" },
            { label: "人物", value: "people" },
          ]}
          value={searchData.categories}
          onChange={(categories) => onDataChange?.({ categories })}
        />
        <MultiSelect<"sfw" | "sketchy">
          label="壁纸级别"
          items={[
            { label: "常规", value: "sfw" },
            { label: "开放", value: "sketchy" },
          ]}
          value={searchData.purity}
          onChange={(purity) => onDataChange?.({ purity })}
        />
        <MultiSelect<string>
          label="排序规则"
          items={[
            { label: "排行", value: "toplist" },
            { label: "最新", value: "date_added" },
            { label: "浏览", value: "views" },
            { label: "收藏", value: "favorites" },
          ]}
          exclusive
          value={searchData.sorting?.[0]}
          onChange={(sorting) => onDataChange?.({ sorting })}
        />
        <MultiSelect<string>
          label="分辨率"
          items={[
            { label: "1080P", value: "1920x1080" },
            { label: "2K", value: "2560x1440" },
            { label: "4K", value: "3840x2160" },
          ]}
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
