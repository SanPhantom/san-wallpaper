import { Stack, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface ILoadingProps {
  tip?: string;
}

const Loading = ({ tip }: ILoadingProps) => {
  return (
    <Stack
      alignItems={"center"}
      direction="row"
      justifyContent={"center"}
      spacing={1}
      sx={{
        py: 1,
        width: "100%",
      }}
    >
      <CircularProgress size={24} />
      <Typography fontSize={14} color="primary.main">
        {tip ?? "数据加载中..."}
      </Typography>
    </Stack>
  );
};

export default Loading;
