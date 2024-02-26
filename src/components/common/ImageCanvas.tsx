import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { Layer, Stage, Transformer } from 'react-konva';
import { useMemoizedFn, useSetState, useSize } from 'ahooks';
import type { KonvaEventObject } from 'konva/lib/Node';
import UrlImage from './UrlImage';

interface ImageCanvasProps {
  url: string;
}
const ImageCanvas = ({ url }: ImageCanvasProps) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const size = useSize(contextRef);

  const [state, setState] = useSetState({
    scale: 1,
  });
  const handleWheel = useMemoizedFn((e: KonvaEventObject<any>) => {
    const delta = e.evt.wheelDelta > 0 ? 0.1 : -0.1;
    if ((state.scale < 2 && delta > 0) || (state.scale > 0.25 && delta < 0)) {
      setState({
        scale: state.scale + delta,
      });
    }
  });
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        flex: 1,
        borderRadius: 4,
        overflow: 'hidden',
      }}
      ref={contextRef}
    >
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
          <UrlImage url={url} contentRef={contextRef} onWheel={handleWheel} scale={state.scale} />
          <Transformer centeredScaling />
        </Layer>
      </Stage>
    </Box>
  );
};

export default ImageCanvas;
