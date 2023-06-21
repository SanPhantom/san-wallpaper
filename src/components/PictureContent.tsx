import { Box } from "@mui/material";
import { useBoolean } from "ahooks";
import { RefObject, forwardRef, useImperativeHandle, useRef } from "react";
import Loading from "./common/Loading";
import ScrollTopFab from "./common/ScrollTopFab";
import Waterfall from "./common/waterfall/Waterfall";

interface PictureContentProps {
  searchKey?: string;
  searchData?: any;
}

const PictureContent = forwardRef(
  ({ searchKey, searchData }: PictureContentProps, ref) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const [
      showScrollTop,
      { setTrue: openShowScrollTop, setFalse: closeShowScrollTop },
    ] = useBoolean(false);

    useImperativeHandle(
      ref,
      () => ({
        reload: () => {},
      }),
      []
    );

    return (
      <Box sx={{ position: "relative", flexGrow: 1, minHeight: 0 }}>
        <Box
          ref={targetRef}
          sx={{ height: "100%", width: "100%", p: 2, overflowY: "scroll" }}
          onScroll={(e) => {
            if ((e.target as HTMLElement).scrollTop !== 0) {
              openShowScrollTop();
            } else {
              closeShowScrollTop();
            }
          }}
        >
          <Waterfall
            list={[]}
            cols={{ xs: 2, sm: 4, lg: 5, xl: 7 }}
            spacing={2}
            onItemShow={(item) => {
              // setState({
              //   selectItem: item,
              // });
              // openDrawer();
            }}
          />
          <Loading />
        </Box>
        <ScrollTopFab
          containerRef={ref as RefObject<HTMLDivElement>}
          isShow={showScrollTop}
        />
      </Box>
    );
  }
);

export default PictureContent;
