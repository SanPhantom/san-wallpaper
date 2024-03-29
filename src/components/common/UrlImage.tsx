import React, { useCallback, useRef } from 'react';
import { useBoolean, useCreation, useMemoizedFn, useSetState, useSize } from 'ahooks';
import { Image as CanvasImage } from 'react-konva';
import { Html } from 'react-konva-utils';
import type { KonvaEventObject } from 'konva/lib/Node';

const UrlImage = ({
  contentRef,
  url,
}: {
  contentRef: React.RefObject<HTMLDivElement>;
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
  const renderCountRef = useRef(0);

  const [imgLoading, { setTrue: startLoading, setFalse: closeLoading }] = useBoolean(false);

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

  const handleWheel = useMemoizedFn((e: KonvaEventObject<any>) => {
    const delta = e.evt.wheelDelta > 0 ? 0.1 : -0.1;
    if ((state.scale < 2 && delta > 0) || (state.scale > 0.5 && delta < 0)) {
      setState({
        scale: state.scale + delta,
      });
    }
  });

  const loadImage = useCallback(() => {
    const image = new Image();
    image.src = url;
    // image.crossOrigin = 'anonymous';

    image.onload = () => {
      closeLoading();
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
    image.onerror = () => {
      if (renderCountRef.current >= 5) {
        console.log('render error');
      } else {
        renderCountRef.current++;
        loadImage();
      }
    };
  }, [url, size]);

  useCreation(() => {
    startLoading();
    if (size) {
      loadImage();
    }
  }, [size]);

  return imgLoading ? (
    <Html>
      <div
        style={{
          ...size,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <progress role="progressbar"></progress>
      </div>
    </Html>
  ) : (
    <CanvasImage
      image={state.img}
      draggable
      x={state.x}
      y={state.y}
      width={state.width}
      height={state.height}
      scaleX={state.scale}
      scaleY={state.scale}
      rotation={state.rotation}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onWheel={handleWheel}
    />
  );
};

export default UrlImage;
