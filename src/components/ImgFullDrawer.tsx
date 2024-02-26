import { alpha, Box, Button, Dialog, DialogProps, Slide, Stack, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import ImageCanvas from './common/ImageCanvas';
import { Close, FileDownload } from '@mui/icons-material';
import { PaperItemType } from '../atoms/paper.atom';

interface IImgFullDrawerProps extends DialogProps {
  item?: PaperItemType | null;
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
        <Button
          onClick={(event) => {
            dialogProp.onClose?.(event, 'backdropClick');
          }}
          variant={'contained'}
          sx={{
            position: 'absolute',
            right: 24,
            top: 24,
            minWidth: 0,
            p: 1,
            bgcolor: 'common.white',
            color: 'common.black',
            zIndex: 999,
            '&:hover': {
              backgroundColor: '#f1f3f5',
            },
          }}
        >
          <Close />
        </Button>
        <Stack sx={{ width: '100%', height: '100%', flexDirection: 'row' }}>
          <ImageCanvas url={item?.path ?? ''} />
          <Stack sx={{ minWidth: 320, width: '20%', bgcolor: 'common.white', pt: 8 }}>
            <Stack
              sx={{
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2,
              }}
            >
              <Stack>
                <Stack sx={{ gap: 1 }}>
                  <Typography variant={'h3'} fontSize={16}>
                    Colors:
                  </Typography>
                  <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                    {item?.colors.map((color) => (
                      <Box
                        key={color}
                        title={color}
                        sx={{ backgroundColor: color, width: 48, height: 48, borderRadius: 1 }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Stack>
              <Button variant={'contained'} startIcon={<FileDownload />}>
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
