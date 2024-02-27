import { Star } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import React, { memo, useRef } from 'react';

interface IImgCardProps {
  item: any;
  idx: number;
  onShow?: () => void;
}

const ImgCard = memo(({ item, onShow }: IImgCardProps) => {
  const containerRef = useRef(null);

  return (
    <Box
      component={'div'}
      className="waterfall-item"
      sx={{
        width: '100%',
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[1],
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      title={item.text || ''}
      ref={containerRef}
      onClick={onShow}
    >
      <Box
        sx={{
          borderRadius: 0.5,
          width: '100%',
          fontSize: 0,
          height: item.displayHeight,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={item.thumbs.original} className="waterfall-img" alt="加载失败" loading={'lazy'} />
      </Box>

      <Stack
        sx={{
          width: '100%',
          p: 1,
          backgroundColor: (theme) => theme.palette.common.white,
          gap: 1,
        }}
      >
        <Typography variant={'h6'} fontSize={14}>
          {item.short_url}
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack
            direction={'row-reverse'}
            alignItems="center"
            justifyContent={'flex-start'}
            gap={0.5}
          >
            <Typography fontSize={12}>{item.favorites}</Typography>
            <Star
              fontSize="small"
              sx={{ fontSize: 12, color: (theme) => theme.palette.warning.main }}
            />
          </Stack>

          <Typography variant="h6" fontSize={12}>
            {item.resolution}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
});

export default ImgCard;
