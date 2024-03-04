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

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        flex: 1,
        overflow: 'hidden',
      }}
      ref={contextRef}
    >
      <Stage
        width={size?.width ?? 0}
        height={size?.height ?? 0}
        draggable={false}
        onContextMenu={(e) => {
          e.evt.stopPropagation();
          e.evt.preventDefault();
        }}
      >
        <Layer>
          <UrlImage url={url} contentRef={contextRef} />
          <Transformer centeredScaling />
        </Layer>
      </Stage>
    </Box>
  );
};

export default ImageCanvas;
