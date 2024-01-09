import { AutoSizer } from "react-virtualized";
import CommonMasonry, { CommonMasonryProps } from "./CommonMasonry";
import { RefObject } from "react";

interface AutoSizerMasonryProps<T extends Record<string, any>>
  extends Omit<CommonMasonryProps<T>, "width" | "height"> {
  target: RefObject<HTMLDivElement>;
}

const AutoSizerMasonry = <T extends Record<string, any>>(
  props: AutoSizerMasonryProps<T>
) => {
  const { target, ...masonryProps } = props;

  const height = target.current?.getBoundingClientRect().height ?? 0;

  return height ? (
    <AutoSizer
      disableHeight
      scrollTop={props.scrollTop}
      height={height}
      overscanByPixels={1500}
    >
      {({ width }) => {
        return (
          <CommonMasonry width={width} height={height * 2} {...masonryProps} />
        );
      }}
    </AutoSizer>
  ) : null;
};

export default AutoSizerMasonry;
