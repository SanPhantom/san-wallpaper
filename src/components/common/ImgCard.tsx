import { Star, Visibility } from "@mui/icons-material";
import {
  alpha,
  Box,
  Fade,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useBoolean, useInViewport } from "ahooks";
import React, { memo, useRef } from "react";

interface IImgCardProps {
  item: any;
  idx: number;
  spacing: number;
  onShow: () => void;
}

const ImgCard = memo(({ item, idx, spacing, onShow }: IImgCardProps) => {
  const [show, { setTrue: openShow, setFalse: closeShow }] = useBoolean(false);
  const containerRef = useRef(null);

  return (
    <Box
      component={"div"}
      className="waterfall-item"
      onMouseEnter={openShow}
      onMouseLeave={closeShow}
      sx={{
        height: item.displayHeight,
        mt: idx === 0 ? 0 : spacing,
        borderRadius: (theme) => theme.spacing(0.5),
        boxShadow: (theme) => theme.shadows[2],
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
      title={item.text || ""}
      ref={containerRef}
    >
      <React.Fragment>
        <Fade in={show}>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              background: (theme) => alpha(theme.palette.common.black, 0.35),
            }}
          >
            <IconButton onClick={onShow}>
              <Visibility htmlColor="white" fontSize="large" />
            </IconButton>
          </Box>
        </Fade>

        <img
          src={item.thumbs.original}
          className="waterfall-img"
          alt="加载失败"
          style={{
            borderRadius: 4,
            display: "block",
            width: "100%",
            fontSize: 0,
          }}
        />
        <Slide direction="up" in={show} container={containerRef.current}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 0,
              py: 0.5,
              px: 1.5,
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.85),
            }}
          >
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"flex-start"}
            >
              <Typography color={"white"} fontSize={14}>
                {item.favorites}
              </Typography>
              <Star fontSize="small" htmlColor="white" />
            </Stack>

            <Typography color={"white"} variant="h6" fontSize={14}>
              {item.resolution}
            </Typography>
          </Stack>
        </Slide>
      </React.Fragment>
    </Box>
  );
});

export default ImgCard;
