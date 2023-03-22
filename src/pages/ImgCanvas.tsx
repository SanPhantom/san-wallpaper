import { Box, Paper, Stack } from "@mui/material";
import { useCreation, useMemoizedFn, useSetState, useSize } from "ahooks";
import React, { useRef } from "react";
import { Stage, Layer, Image as CanvasImage } from "react-konva";
import useImage from "use-image";

interface IImgCanvasProps {}

const UrlImage = ({
  contentRef,
  onWheel,
  scale,
}: {
  contentRef: React.RefObject<HTMLDivElement>;
  onWheel: (e: any) => void;
  scale: number;
}) => {
  const [state, setState] = useSetState({
    img: undefined as CanvasImageSource | undefined,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0,
    scale: 1,
    isDragging: false,
  });
  const size = useSize(contentRef);

  const handleDragStart = useMemoizedFn(() => {
    setState({
      isDragging: true,
    });
  });

  const handleDragEnd = useMemoizedFn(() => {
    setState({
      isDragging: false,
    });
  });

  const loadImage = useMemoizedFn(() => {
    const image = new Image();
    // image.src = "https://w.wallhaven.cc/full/qz/wallhaven-qzdqvr.jpg";
    image.src = "https://w.wallhaven.cc/full/vq/wallhaven-vqz35l.jpg";
    image.onload = () => {
      const imageRate = image.width / image.height;
      const contentRate = (size?.width ?? 0) / (size?.height ?? 0);
      if (imageRate > contentRate) {
        const scale = (contentRef.current?.clientWidth ?? 0) / image.width;
        setState({
          width: contentRef.current?.clientWidth ?? 0,
          height: image.height * scale,
          y:
            ((contentRef.current?.clientHeight ?? 0) - image.height * scale) /
            2,
          x: 0,
        });
      } else {
        const scale = (contentRef.current?.clientHeight ?? 0) / image.height;
        setState({
          height: contentRef.current?.clientHeight ?? 0,
          width: image.width * scale,
          x: ((contentRef.current?.clientWidth ?? 0) - image.width * scale) / 2,
          y: 0,
        });
      }
      setState({
        img: image,
      });
    };
  });

  useCreation(() => {
    loadImage();
  }, [size]);

  return (
    <CanvasImage
      image={state.img}
      draggable
      x={state.x}
      y={state.y}
      width={state.width}
      height={state.height}
      scaleX={scale}
      scaleY={scale}
      rotation={state.rotation}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onWheel={onWheel}
    />
  );
};

const ImgCanvas = () => {
  const contextRef = useRef<HTMLDivElement>(null);
  const size = useSize(contextRef);

  const [state, setState] = useSetState({
    scale: 1,
  });
  const handleWheel = useMemoizedFn((e) => {
    const delta = e.evt.wheelDelta > 0 ? 0.1 : -0.1;
    if ((state.scale < 2 && delta > 0) || (state.scale > 0.25 && delta < 0)) {
      setState({
        scale: state.scale + delta,
      });
    }
  });

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        boxSizing: "border-box",
        gap: 2,
      }}
    >
      <Paper sx={{ py: 1, px: 2 }}>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent={"center"}
          sx={{ width: "100%", height: "100%" }}
        ></Stack>
      </Paper>
      <Box sx={{ width: "100%", height: "100%", flex: 1 }} ref={contextRef}>
        <Stage
          width={size?.width ?? 0}
          height={size?.height ?? 0}
          onWheel={handleWheel}
          draggable
          onContextMenu={(e) => {
            e.evt.stopPropagation();
            e.evt.preventDefault();
          }}
        >
          <Layer>
            <UrlImage
              contentRef={contextRef}
              onWheel={handleWheel}
              scale={state.scale}
            />
          </Layer>
        </Stage>
      </Box>
    </Stack>
  );
};

export default ImgCanvas;
