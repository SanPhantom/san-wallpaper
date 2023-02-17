import React, { useRef } from "react";
import { useMemoizedFn, useCreation, useSetState, useSize } from "ahooks";
import "./waterfall.less";
import { Box, Breakpoint, Grid } from "@mui/material";
import useGridCol from "../hooks/useGridCol";
import ImgCard from "./ImgCard";

interface IWaterfallProps {
  list: any[];
  cols: number | { [key in Breakpoint]?: number };
  spacing?: number;
  onItemShow?: (item: any) => void;
}

const Waterfall = ({
  list,
  cols,
  spacing = 8,
  onItemShow,
}: IWaterfallProps) => {
  const waterfallRef = useRef<HTMLDivElement>(null);
  const size = useSize(waterfallRef);
  const col = useGridCol(cols);

  const [state, setState] = useSetState({
    colList: [] as any[],
    colWidth: 0,
  });

  const allocateItems = useMemoizedFn(async (ls, len, colWidth) => {
    const arr: any[][] = [];
    const heightArr: number[] = [];

    for (let i = 0; i < len; i++) {
      arr.push([]);
      heightArr.push(0);
    }

    /** 获取高度最小的流的索引值 */
    const getIndexOfMinHeightFlow = () => {
      let minH = Number.MAX_SAFE_INTEGER;
      let minIndex = 0;
      heightArr.forEach((h, index) => {
        if (h < minH) {
          minH = h;
          minIndex = index;
        }
      });
      return minIndex;
    };

    ls.forEach((item: any, idx: any) => {
      const index = getIndexOfMinHeightFlow();
      item.displayHeight =
        (item.dimension_y * state.colWidth) / item.dimension_x;
      arr[index].push(item);
      heightArr[index] += item.displayHeight;
    });
    return arr;
  });

  useCreation(async () => {
    const colWidth = ((size?.width ?? 0) - (col - 1) * (spacing * 8)) / col;
    setState({
      colList: await allocateItems(list, col, colWidth),
      colWidth,
    });
    return () => {
      setState({
        colList: [],
        colWidth: 0,
      });
    };
  }, [list, spacing, size, col]);

  return (
    <Grid
      container
      ref={waterfallRef}
      className={"waterfall-container"}
      spacing={spacing}
    >
      {state.colList.map((colItem, colIdx) => (
        <Grid
          item
          xs={12 / col}
          key={"flow_" + colIdx}
          className="waterfall-list"
          style={{ width: state.colWidth + "px" }}
        >
          {colItem?.map((item: any, idx: number) => (
            <ImgCard
              key={"flow_" + colIdx + "_item_" + idx + "_" + item.displayHeight}
              item={item}
              idx={idx}
              spacing={spacing}
              onShow={() => onItemShow?.(item)}
            />
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default Waterfall;
