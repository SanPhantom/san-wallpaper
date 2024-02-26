import React, { RefObject, useRef, useState } from 'react';
import usePaperPagination, { PaperItemType } from '../atoms/paper.atom';
import { Box, Stack } from '@mui/material';
import {
  useContainerPosition,
  useMasonry,
  UseMasonryOptions,
  usePositioner,
  useResizeObserver,
  useScroller,
} from 'masonic';
import ImgCard from './common/ImgCard';
import { useBoolean } from 'ahooks';
import Loading from './common/Loading';
import useGridCol from '../hooks/useGridCol';
import ImgFullDrawer from './ImgFullDrawer';
import { useWindowSize } from '@react-hook/window-size';

const CommonMasonry = ({
  columnCount = 8,
  ...props
}: Omit<UseMasonryOptions<any>, 'height' | 'positioner' | 'scrollTop'> & {
  target?: RefObject<HTMLDivElement>;
  columnCount?: number;
}) => {
  const containerRef = useRef(null);
  const [windowWidth, height] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [windowWidth, height]);
  const { scrollTop, isScrolling } = useScroller(offset);
  const positioner = usePositioner(
    {
      width,
      columnGutter: 16,
      maxColumnCount: 6,
      columnCount: columnCount,
    },
    [width, columnCount],
  );
  const resizeObserver = useResizeObserver(positioner);

  return useMasonry({
    positioner,
    scrollTop,
    height,
    isScrolling,
    containerRef,
    resizeObserver,
    ...props,
  });
};
const NewPictureContent = () => {
  const { list } = usePaperPagination();

  const columnCount = useGridCol({ xs: 2, sm: 3, lg: 4, xl: 6 });

  const [open, { setTrue: openDrawer, setFalse: hideDrawer }] = useBoolean(false);
  const [selectItem, setSelectItem] = useState<PaperItemType | null>(null);

  return (
    <Stack sx={{ position: 'relative', flexGrow: 1, minHeight: 0 }}>
      <Box sx={{ height: '100%', width: '100%', p: 2 }}>
        <CommonMasonry
          columnCount={columnCount}
          overscanBy={2}
          items={list}
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
      {open && selectItem && <ImgFullDrawer open={open} item={selectItem} onClose={hideDrawer} />}
    </Stack>
  );
};

export default NewPictureContent;
