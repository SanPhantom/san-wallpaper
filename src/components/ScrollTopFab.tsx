import { ExpandLess } from "@mui/icons-material";
import { Tooltip, Fab, Fade } from "@mui/material";
import React from "react";

interface IScrollTopFabProps {
  containerRef: React.RefObject<HTMLDivElement>;
  bottom?: number;
  right?: number;
  isShow?: boolean;
}

const ScrollTopFab = ({
  containerRef,
  isShow,
  bottom = 96,
  right = 32,
}: IScrollTopFabProps) => {
  return (
    <Tooltip title="滚动到顶部">
      <Fade in={isShow}>
        <Fab
          size="small"
          color="primary"
          sx={{ position: "fixed", bottom, right }}
          onClick={() => {
            containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <ExpandLess />
        </Fab>
      </Fade>
    </Tooltip>
  );
};

export default ScrollTopFab;
