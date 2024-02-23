import { Close, Download } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Dialog,
  DialogProps,
  Divider,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useMemoizedFn } from 'ahooks';
import React from 'react';
import ImageCanvas from './common/ImageCanvas';

interface IImgFullDrawerProps extends DialogProps {
  item?: any;
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
  const downloadImg = useMemoizedFn(async () => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'Anonymous');
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      context?.drawImage(img, 0, 0, img.width, img.height);
      let url = canvas.toDataURL(item.file_type);
      let a = document.createElement('a');
      const filename = (item.path as string).split('/').pop();
      const event = new MouseEvent('click');
      a.download = filename || `${item.id}.png`;
      a.href = url;
      a.dispatchEvent(event);
    };
    img.src = item.path;
  });

  return (
    <Dialog fullScreen TransitionComponent={Transition} {...dialogProp}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={(e) => dialogProp?.onClose?.(e, 'escapeKeyDown')}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              San Wallpaper
            </Typography>
          </Box>

          <Tooltip title="下载原图">
            <IconButton edge="start" color="inherit" onClick={downloadImg} aria-label="download">
              <Download />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Stack sx={{ width: '100%', minHeight: 0, flex: 1 }}>
        <Toolbar />
        <Stack
          direction={'row'}
          spacing={1}
          divider={<Divider orientation="vertical" />}
          sx={{ flex: 1, minHeight: 0, fontSize: 0 }}
        >
          {/* <Box sx={{ width: "20%", maxWidth: 400 }}></Box> */}
          <Box sx={{ flex: 1, minHeight: 0, fontSize: 0 }}>
            <ImageCanvas url={item?.path} />
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ImgFullDrawer;
