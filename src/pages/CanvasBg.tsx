import { Box } from '@mui/material';
import { useMemoizedFn, useSize } from 'ahooks';
import React, { useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { animated, config, useSpring } from '@react-spring/konva';
import { HitContext } from 'konva/lib/Context';
import { Shape } from 'konva/lib/Shape';

const Particle = (props: { index: number }) => {
  const randomHex = useMemoizedFn(() => {
    return Math.floor(Math.random() * 255);
  });
  const randomNum = useMemoizedFn((max: number) => {
    return Math.floor(Math.random() * max) + 1;
  });

  const red = randomHex();
  const green = randomHex();
  const blue = randomHex();

  const x = randomNum(1100);
  const y = randomNum(1100);
  const r = 2;

  const [springProps] = useSpring(
    () => ({
      form: { fill: `rgba(${red}, ${green}, ${blue}, 0)` },
      to: [
        { fill: `rgba(${red}, ${green}, ${blue}, 0.25)` },
        { fill: `rgba(${red}, ${green}, ${blue}, 0.5)` },
        { fill: `rgba(${red}, ${green}, ${blue}, 0.75)` },
        { fill: `rgba(${red}, ${green}, ${blue}, 1)` },
      ],
      config: config.wobbly,
      loop: {
        reverse: true,
        delay: props.index,
      },
    }),
    [],
  );

  return (
    // @ts-ignore
    <animated.Shape
      {...springProps}
      sceneFunc={(context: HitContext, shape: Shape) => {
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
    />
  );
};

const ParticleCanvas = ({ num = 50 }: { num?: number }) => {
  const data = new Array(num).fill(0);

  return (
    <>
      {data.map((item, index) => {
        return <Particle key={`particle_${index}`} index={index} />;
      })}
    </>
  );
};

const CanvasBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const size = useSize(containerRef);

  return (
    <Box sx={{ width: '100%', height: '100%' }} ref={containerRef}>
      <Stage {...size}>
        <Layer>
          <ParticleCanvas num={120} />
        </Layer>
      </Stage>
    </Box>
  );
};

export default CanvasBg;
