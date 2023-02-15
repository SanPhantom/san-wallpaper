import React, { useRef } from "react";
import { useMemoizedFn, useCreation, useSetState, useSize } from "ahooks";
import "./waterfall.less";
import { Box, Breakpoint, Grid } from "@mui/material";
import useGridCol from "../hooks/useGridCol";

interface IWaterfallProps {
  list: any[];
  cols: number | { [key in Breakpoint]?: number };
  spacing?: number;
}

const Waterfall = ({ list, cols, spacing = 8 }: IWaterfallProps) => {
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

    const getImageRect = async (item: any) => {
      return new Promise<{ w: number; h: number }>((resolve) => {
        const img = new Image();
        img.src = item.thumbs.original;
        // img.setAttribute("crossorigin", "anonymous");

        img.onload = (e) => {
          let w = Number(img.width);
          let h = Number(img.height);
          resolve({ w, h });
        };
      });
    };

    const lsWH = await Promise.all(
      ls.map((item: any) => {
        return getImageRect(item);
      })
    );

    ls.forEach((item: any, idx: any) => {
      const index = getIndexOfMinHeightFlow();
      item.displayHeight = (lsWH[idx].h * state.colWidth) / lsWH[idx].w;
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
            <Box
              className="waterfall-item"
              key={"flow_" + colIdx + "_item_" + idx + "_" + item.displayHeight}
              style={{
                height: item.displayHeight,
                marginTop: idx === 0 ? 0 : spacing * 8,
              }}
              title={item.text || ""}
            >
              <img
                loading="lazy"
                src={item.thumbs.original}
                className="waterfall-img"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: "block",
                  width: "100%",
                }}
              />
            </Box>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default Waterfall;
