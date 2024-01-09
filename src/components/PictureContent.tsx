import { Box } from "@mui/material";
import { useBoolean } from "ahooks";
import {
  ReactNode,
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import usePaperPagination, { PaperItemType } from "../atoms/paper.atom";
import ImgFullDrawer from "./ImgFullDrawer";
import Loading from "./common/Loading";
import ScrollTopFab from "./common/ScrollTopFab";
import Waterfall from "./common/waterfall/Waterfall";
import AutoSizerMasonry from "./common/masonry/AutoSizerMasonry";
import { MasonryItemProps } from "./common/masonry/CommonMasonry";
import ImgCard from "./common/ImgCard";

const PictureContent = forwardRef(({}, ref) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { list } = usePaperPagination();

  const [open, { setTrue: openDrawer, setFalse: hideDrawer }] =
    useBoolean(false);
  const [selectItem, setSelectItem] = useState<PaperItemType | null>(null);

  const [
    showScrollTop,
    { setTrue: openShowScrollTop, setFalse: closeShowScrollTop },
  ] = useBoolean(false);

  const [scrollTop, setScrollTop] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      reload: () => {},
    }),
    []
  );

  useLayoutEffect(() => {
    targetRef.current?.addEventListener("scroll", () => {
      const scrollTop = targetRef.current?.scrollTop ?? 0;
      const offsetTop = containerRef.current?.offsetTop ?? 0;

      if (scrollTop !== 0) {
        openShowScrollTop();
      } else {
        closeShowScrollTop();
      }

      setScrollTop(scrollTop - offsetTop);
    });
  });

  return (
    <Box sx={{ position: "relative", flexGrow: 1, minHeight: 0 }}>
      <Box
        ref={targetRef}
        sx={{ height: "100%", width: "100%", p: 2, overflowY: "auto" }}
      >
        <Box ref={containerRef} sx={{ width: "100%", height: "100%" }}>
          <AutoSizerMasonry
            cols={{ xs: 2, sm: 3, lg: 4, xl: 5 }}
            scrollTop={scrollTop}
            target={containerRef}
            list={list}
            itemRender={({ item, index, colWidth }) => {
              const displayHeight =
                (item.dimension_y * colWidth) / item.dimension_x;
              return (
                <ImgCard
                  key={item.id}
                  item={{ ...item, displayHeight }}
                  idx={index}
                  spacing={0}
                  onShow={() => {
                    setSelectItem(item);
                    openDrawer();
                  }}
                />
              );
            }}
          />
          <Loading />
        </Box>
      </Box>
      <ScrollTopFab
        containerRef={targetRef as RefObject<HTMLDivElement>}
        isShow={showScrollTop}
      />
      <ImgFullDrawer open={open} item={selectItem} onClose={hideDrawer} />
    </Box>
  );
});

export default PictureContent;
