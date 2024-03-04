import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogProps,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useCallback } from 'react';
import ImageCanvas from './common/ImageCanvas';
import { Close, FileDownloadOutlined } from '@mui/icons-material';
import { PaperItemType } from '../atoms/paper.atom';

interface IImgFullDrawerProps extends DialogProps {
  item: PaperItemType;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide direction="up" ref={ref} {...props}>
      {props.children}
    </Slide>
  );
});

const ImgFullDrawer = ({ item, ...dialogProp }: IImgFullDrawerProps) => {
  const theme = useTheme();

  const downloadImage = useCallback(() => {
    const tag = document.createElement('a');

    const img = new Image();
    img.src = item.path;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = item.dimension_x;
      canvas.height = item.dimension_y;
      const ctx = canvas.getContext('2d');
      // 以图片为背景剪裁画布
      ctx?.drawImage(img, 0, 0, item.dimension_x, item.dimension_y);

      const filename = item.path.split('/').pop();

      tag.href = canvas.toDataURL(item.file_type, 1);
      tag.download = filename!;
      tag.dispatchEvent(new MouseEvent('click'));
      document.removeChild(tag);
      document.removeChild(canvas);
    };
  }, [item]);

  return (
    <Dialog
      fullWidth
      TransitionComponent={Transition}
      {...dialogProp}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: '80vw',
          height: '80vh',
          margin: 0,
          borderRadius: 4,
          backgroundColor: alpha('#fff', 0.9),
        },
      }}
    >
      <Stack sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <Stack sx={{ width: '100%', height: '100%', flexDirection: 'row' }}>
          <ImageCanvas url={item?.path ?? ''} />
          <Stack sx={{ minWidth: 320, width: '20%', bgcolor: 'common.white' }}>
            <Toolbar sx={{ borderBottom: `1px solid ${theme.palette.grey['200']}` }}>
              <Stack sx={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Button
                  onClick={(event) => {
                    dialogProp.onClose?.(event, 'backdropClick');
                  }}
                  variant={'text'}
                  sx={{
                    minWidth: 0,
                    p: 1,
                    color: 'common.black',
                  }}
                >
                  <Close />
                </Button>
              </Stack>
            </Toolbar>
            <Stack
              sx={{
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                px: 2,
                py: 4,
              }}
            >
              <Stack sx={{ gap: 3 }}>
                <Stack sx={{ flexDirection: 'row', gap: 0 }}>
                  {item?.colors.map((color) => (
                    <Box
                      key={color}
                      title={color}
                      sx={{
                        backgroundColor: color,
                        width: 24,
                        height: 24,
                        flex: 1,
                      }}
                    />
                  ))}
                </Stack>
                <Stack sx={{ gap: 1 }}>
                  <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                    <Typography fontSize={14} fontWeight={700} color={'grey.500'}>
                      尺寸:
                    </Typography>
                    <Typography fontSize={14}>{item.resolution}</Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                    <Typography fontSize={14} fontWeight={700} color={'grey.500'}>
                      大小:
                    </Typography>
                    <Typography fontSize={14}>
                      {(item.file_size / 1024 / 1024).toFixed(2)}MiB
                    </Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                    <Typography fontSize={14} fontWeight={700} color={'grey.500'}>
                      类型:
                    </Typography>
                    <Typography fontSize={14}>
                      {item.file_type.split('/')[1].toUpperCase()}
                    </Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                    <Typography fontSize={14} fontWeight={700} color={'grey.500'}>
                      浏览:
                    </Typography>
                    <Typography fontSize={14}>{item.views}</Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                    <Typography fontSize={14} fontWeight={700} color={'grey.500'}>
                      收藏:
                    </Typography>
                    <Typography fontSize={14}>{item.favorites}</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Button
                variant={'contained'}
                startIcon={<FileDownloadOutlined />}
                onClick={downloadImage}
                sx={{ color: 'common.white' }}
              >
                <Typography variant={'body2'} fontWeight={500}>
                  下载图片
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ImgFullDrawer;
