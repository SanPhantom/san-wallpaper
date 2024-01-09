import { Paper, Typography, ToggleButton } from "@mui/material";
import { useMemoizedFn } from "ahooks";
import React from "react";
import { StyledToggleButtonGroup } from "../StyledComponent";

interface IMultiSelectProps<T> {
  label: string;
  items: any[];
  value?: T;
  onChange?: (v: T) => void;
  exclusive?: boolean;
}

const MultiSelect = <T extends string>({
  label,
  items,
  value,
  onChange,
  exclusive,
}: IMultiSelectProps<T>) => {
  const handleTypes = useMemoizedFn((_, newData) => {
    onChange?.(exclusive ? newData : newData.join("/"));
  });

  return (
    <Paper
      elevation={1}
      sx={{ display: "flex", alignItems: "center", px: 1.5 }}
    >
      <Typography fontSize={14}>{label}：</Typography>
      <StyledToggleButtonGroup
        size="small"
        exclusive={exclusive}
        value={value?.split("/")}
        onChange={handleTypes}
      >
        {items.map((item) => (
          <ToggleButton key={item.value} value={item.value} color="primary">
            {item.label}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default MultiSelect;
