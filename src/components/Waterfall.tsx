import React, { useRef } from "react";
import { useMemoizedFn, useMount, useCreation } from "ahooks";

interface IWaterfallProps {
  list: any[];
  cols: number;
  spacing?: number;
}

const Waterfall = ({ list, cols, spacing = 4 }: IWaterfallProps) => {
  const waterfallRef = useRef<HTMLDivElement>(null);

  const allocateItems = useMemoizedFn((ls, len, colWidth) => {
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

    ls.forEach(
      (
        item: { displayHeight: number; height: number; width: number },
        idx: any
      ) => {
        const index = getIndexOfMinHeightFlow();
        item.displayHeight = (item.height * colWidth) / item.width;
        arr[index].push(item);
        heightArr[index] += item.displayHeight;
      }
    );

    return arr;
  });

  useCreation(() => {
    const width = waterfallRef.current?.getBoundingClientRect().width ?? 0;
    const colWidth = (width - (cols - 1) * spacing) / cols;
  }, [cols]);

  return <div ref={waterfallRef}></div>;
};

export default Waterfall;
