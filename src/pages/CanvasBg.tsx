import { Box } from "@mui/material";
import { useMemoizedFn, useSize } from "ahooks";
import React, { useRef } from "react";
import { Layer, Stage } from "react-konva";
import {
  Spring,
  animated,
  useSpring,
  useTransition,
} from "@react-spring/konva";
import { HitContext } from "konva/lib/Context";
import { Shape, ShapeConfig } from "konva/lib/Shape";

const Particle = ({ num = 50 }: { num?: number }) => {
  const data = new Array(num).fill(0);

  const randomColor = useMemoizedFn(() => {
    const randomHex = () => {
      return Math.floor(Math.random() * 255);
    };
    const alpha = () => (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    return `rgba(${randomHex()}, ${randomHex()}, ${randomHex()}, ${alpha()})`;
  });

  const randomNum = useMemoizedFn((max: number) => {
    return Math.floor(Math.random() * max);
  });

  const springProps = useTransition(data, {
    key: (_: any, index: number) => `particle_${index}`,
    form: () => ({ opacity: 0 }),
    enter: () => ({ opacity: 1 }),
    leave: () => ({ opacity: 0 }),
    loop: true,
  });

  return (
    <>
      {data.map((_, index) => (
        // @ts-ignore
        <animated.Shape
          key={`particle_${index}`}
          {...springProps}
          fill={randomColor()}
          sceneFunc={(context: HitContext, shape: Shape) => {
            const { width, height } = context.canvas;
            // context.fillStyle = randomColor();
            context.beginPath();
            context.arc(
              randomNum(width),
              randomNum(height),
              randomNum(3),
              0,
              2 * Math.PI,
              false
            );
            context.closePath();
            context.fill();
            context.fillStrokeShape(shape);
          }}
        />
      ))}
    </>
  );
};

const CanvasBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const size = useSize(containerRef);

  return (
    <Box sx={{ width: "100%", height: "100%" }} ref={containerRef}>
      <Stage {...size}>
        <Layer>
          <Particle num={2250} />
        </Layer>
      </Stage>
    </Box>
  );
};

export default CanvasBg;
