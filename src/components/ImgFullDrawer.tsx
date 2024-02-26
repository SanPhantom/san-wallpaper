import { alpha, Box, Dialog, DialogProps, Slide, Stack } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
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
      <Stack sx={{ width: '100%', height: '100%', fontSize: 0 }}>
        <Box sx={{ width: '100%', height: '100%', fontSize: 0 }}>
          <ImageCanvas url={item?.path} />
        </Box>
      </Stack>
    </Dialog>
  );
};

export default ImgFullDrawer;
