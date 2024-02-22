import { Breakpoint, Stack } from "@mui/material";
import { useUpdateEffect } from "ahooks";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  Masonry,
  MasonryCellProps,
  MasonryState,
  createMasonryCellPositioner,
} from "react-virtualized";
import useGridCol from "../../../hooks/useGridCol";

export interface MasonryItemProps<T extends Record<string, any>> {
  item: T;
  index: number;
  colWidth: number;
}

export interface CommonMasonryProps<T extends Record<string, any>> {
  cols?: number | { [key in Breakpoint]?: number };
  space?: number;
  scrollTop: number;
  width: number;
  height: number;
  list: T[];
  itemRender: (props: MasonryItemProps<T>) => React.ReactNode;
}

const CommonMasonry = <T extends Record<string, any>>(
  props: CommonMasonryProps<T>,
) => {
  const {
    cols = 2,
    space = 16,
    width,
    height = 0,
    list,
    scrollTop,
    itemRender,
  } = props;

  const masonryRef = useRef<Masonry>(null);

  const [masonryState, setMasonryState] = useState<MasonryState>({
    isScrolling: true,
    scrollTop: 0,
  });

  const col = useGridCol(cols);

  console.log({ col });

  const colWidth = useMemo(() => {
    return Math.floor((width - space * (col - 1)) / col);
  }, [width, space, col]);

  const masonryCache = useMemo(() => {
    return new CellMeasurerCache({
      defaultWidth: width,
      defaultHeight: height,
      fixedWidth: true,
    });
  }, [width, height]);

  const masonryCellPosition = useMemo(() => {
    return createMasonryCellPositioner({
      cellMeasurerCache: masonryCache,
      columnCount: col,
      columnWidth: colWidth,
      spacer: space,
    });
  }, [masonryCache, colWidth, space, col]);

  const renderMasonry = useCallback(() => {
    masonryCache.clearAll();
    masonryCellPosition.reset({
      columnCount: col,
      columnWidth: colWidth,
      spacer: space,
    });
    masonryRef.current?.clearCellPositions();
  }, [masonryCache, masonryCellPosition, col, colWidth, space]);

  const MasonryItemRender = useCallback(
    ({ index, key, parent, style }: MasonryCellProps) => {
      const masonryItem = list[index];
      return (
        <CellMeasurer
          cache={masonryCache}
          index={index}
          key={key}
          parent={parent}
        >
          <Stack style={{ ...style, width: colWidth }}>
            {masonryItem
              ? itemRender({ item: masonryItem, index, colWidth })
              : null}
          </Stack>
        </CellMeasurer>
      );
    },
    [colWidth, masonryCache, itemRender, list],
  );

  useEffect(() => {
    setMasonryState((prevState) => ({
      ...prevState,
      scrollTop: scrollTop - 1,
    }));
  }, [scrollTop]);

  useUpdateEffect(() => {
    renderMasonry();
  }, [width, col]);

  return (
    <Masonry
      autoHeight
      cellMeasurerCache={masonryCache}
      cellPositioner={masonryCellPosition}
      height={height}
      width={width}
      ref={masonryRef}
      scrollTop={masonryState.scrollTop}
      cellCount={list.length}
      cellRenderer={MasonryItemRender}
      overscanByPixels={1500}
    />
  );
};

export default CommonMasonry;
