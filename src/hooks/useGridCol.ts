import { Breakpoint, Theme, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

const useGridCol = (cols: number | { [key in Breakpoint]?: number }): number => {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
  const [currentCol, setCurrentCol] = useState(0);

  const handleListenCol = useCallback(() => {
    if (typeof cols === 'number') {
      return cols;
    }
    return keys.reduceRight((output: number, key: Breakpoint) => {
      const query = `(min-width: ${theme.breakpoints.values[key]}px)`;
      const matchMedia = window.matchMedia(query);
      const matches = matchMedia.matches;
      console.log(matches, key, query);
      const curCol = cols[key];
      return matches ? curCol ?? output : output;
    }, 2);
  }, [cols, keys]);

  useEffect(() => {
    setCurrentCol(handleListenCol());
    window.onresize = () => {
      setCurrentCol(handleListenCol());
    };
  }, [setCurrentCol]);

  return currentCol;
};

export default useGridCol;
