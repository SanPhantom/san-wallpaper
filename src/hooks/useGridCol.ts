import { Breakpoint, Theme, useMediaQuery, useTheme } from "@mui/material";
import { useCreation } from "ahooks";

type BreakpointOrNull = Breakpoint | null;

const useGridCol = (
  cols: number | { [key in Breakpoint]?: number }
): number => {
  if (typeof cols === "number") {
    return cols;
  }

  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();

  const col = keys.reduceRight(
    (output: number, key: Breakpoint, idx: number) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      const curCol = cols[key];
      return matches ? curCol ?? output : output;
    },
    2
  );

  return col;
};

export default useGridCol;
