import { Stack, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import usePaperPagination from '../../atoms/paper.atom';
import { useInViewport } from 'ahooks';

interface ILoadingProps {
  tip?: string;
}

const Loading = ({ tip }: ILoadingProps) => {
  const { loadMore, isLock } = usePaperPagination(true);

  const loadingRef = useRef<HTMLDivElement>(null);

  const [isViewport] = useInViewport(loadingRef);

  if (isViewport && !isLock) {
    loadMore().then(() => {
      console.log('加载完成');
    });
  }

  return (
    <Stack
      ref={loadingRef}
      alignItems={'center'}
      direction="row"
      justifyContent={'center'}
      spacing={1}
      sx={{
        py: 1,
        width: '100%',
      }}
    >
      <CircularProgress size={18} />
      <Typography fontSize={12} color="primary.main">
        {tip ?? '数据加载中...'}
      </Typography>
    </Stack>
  );
};

export default Loading;
