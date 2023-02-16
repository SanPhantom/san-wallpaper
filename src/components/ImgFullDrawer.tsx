import { Close, Download } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogProps,
  Divider,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

interface IImgFullDrawerProps extends DialogProps {
  item?: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImgFullDrawer = ({ item, ...dialogProp }: IImgFullDrawerProps) => {
  return (
    <Dialog fullScreen TransitionComponent={Transition} {...dialogProp}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={(e) => dialogProp?.onClose?.(e, "escapeKeyDown")}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            San Wallpaper
          </Typography>
          <Tooltip title="下载原图">
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {}}
              aria-label="download"
            >
              <Download />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Stack sx={{ width: "100%", minHeight: 0 }}>
        <Toolbar />
        <Stack
          direction={"row"}
          spacing={1}
          divider={<Divider orientation="vertical" />}
          sx={{ flex: 1, minHeight: 0, fontSize: 0, p: 3 }}
        >
          <Box sx={{ width: "20%", maxWidth: 400 }}></Box>
          <Box sx={{ flex: 1, minHeight: 0, fontSize: 0, p: 3 }}>
            <img
              loading="lazy"
              src={item?.path}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              crossOrigin="anonymous"
            />
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ImgFullDrawer;
