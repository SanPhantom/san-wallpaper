import React, { useCallback } from 'react';
import { useCreation, useMemoizedFn, useSetState, useSize } from 'ahooks';
import { Image as CanvasImage } from 'react-konva';

const UrlImage = ({
  contentRef,
  onWheel,
  scale,
  url,
}: {
  contentRef: React.RefObject<HTMLDivElement>;
  onWheel: (e: any) => void;
  scale: number;
  url: string;
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

  const loadImage = useCallback(() => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const imageRate = image.width / image.height;
      const contentRate = (size?.width ?? 0) / (size?.height ?? 0);
      if (imageRate > contentRate) {
        const scale = (contentRef.current?.clientWidth ?? 0) / image.width;
        setState({
          width: contentRef.current?.clientWidth ?? 0,
          height: image.height * scale,
          y: ((contentRef.current?.clientHeight ?? 0) - image.height * scale) / 2,
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
  }, [url, size]);

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

export default UrlImage;
