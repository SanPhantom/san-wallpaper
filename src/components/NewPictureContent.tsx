import React, { RefObject, useEffect, useRef, useState } from 'react';
import usePaperPagination, { PaperItemType } from '../atoms/paper.atom';
import { Box, Stack } from '@mui/material';
import {
  useContainerPosition,
  useMasonry,
  UseMasonryOptions,
  usePositioner,
  useResizeObserver,
} from 'masonic';
import ImgCard from './common/ImgCard';
import { useBoolean, useScroll, useSize } from 'ahooks';
import Loading from './common/Loading';
import useGridCol from '../hooks/useGridCol';
import ScrollTopFab from './common/ScrollTopFab';
import ImgFullDrawer from './ImgFullDrawer';

const CommonMasonry = ({
  target,
  scrollTop,
  columnCount = 8,
  ...props
}: Omit<UseMasonryOptions<any>, 'height' | 'positioner' | 'scrollTop'> & {
  target?: RefObject<HTMLDivElement>;
  scrollTop?: number;
  columnCount?: number;
}) => {
  const containerRef = useRef(null);
  const size = useSize(target);
  const { width } = useContainerPosition(containerRef, [size]);
  const positioner = usePositioner(
    {
      width,
      columnGutter: 16,
      maxColumnCount: 8,
      columnCount: columnCount,
    },
    [width, columnCount],
  );
  const resizeObserver = useResizeObserver(positioner);

  return useMasonry({
    positioner,
    scrollTop: scrollTop ?? 0,
    height: target?.current?.offsetHeight ?? 0,
    containerRef,
    resizeObserver,
    ...props,
  });
};
const NewPictureContent = () => {
  const { list } = usePaperPagination();
  const targetRef = useRef(null);
  const [showScrollTop, { setTrue: openShowScrollTop, setFalse: closeShowScrollTop }] =
    useBoolean(false);

  const position = useScroll(targetRef);
  const [isScrolling, { setTrue: startScrolling, setFalse: endScrolling }] = useBoolean(false);
  const columnCount = useGridCol({ xs: 2, sm: 3, lg: 4, xl: 8 });

  const timerRef = useRef<number | null>(null);

  const [open, { setTrue: openDrawer, setFalse: hideDrawer }] = useBoolean(false);
  const [selectItem, setSelectItem] = useState<PaperItemType | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      if (position?.top && position.top > 1500) {
        openShowScrollTop();
      } else {
        closeShowScrollTop();
      }
      startScrolling();
    }
    timerRef.current = setTimeout(() => {
      endScrolling();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }, 100);
  }, [position]);

  return (
    <Stack sx={{ position: 'relative', flexGrow: 1, minHeight: 0 }}>
      <Box ref={targetRef} sx={{ height: '100%', width: '100%', p: 2, overflowY: 'auto' }}>
        <Box sx={{ width: '100%', minHeight: '100%' }}>
          <CommonMasonry
            target={targetRef}
            columnCount={columnCount}
            isScrolling={isScrolling}
            overscanBy={2}
            items={list}
            scrollTop={position?.top ?? 0}
            render={({ index, data: item, width }) => {
              const height = (item.dimension_y * width) / item.dimension_x;
              return (
                <ImgCard
                  key={item.id}
                  item={{ ...item, displayHeight: height }}
                  idx={index}
                  onShow={() => {
                    setSelectItem(item);
                    openDrawer();
                  }}
                />
              );
            }}
          />
          <Loading />
        </Box>
      </Box>
      <ScrollTopFab containerRef={targetRef as RefObject<HTMLDivElement>} isShow={showScrollTop} />
      <ImgFullDrawer open={open} item={selectItem} onClose={hideDrawer} />
    </Stack>
  );
};

export default NewPictureContent;
