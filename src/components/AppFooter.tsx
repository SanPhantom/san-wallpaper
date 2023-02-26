import { Stack, Divider, Typography, Link } from "@mui/material";
import React from "react";

interface IAppFooterProps {}

const AppFooter = () => {
  return (
    <Stack alignItems={"center"}>
      <Divider sx={{ width: "100%" }} />
      <Stack alignItems={"center"} spacing={0.4} sx={{ py: 1 }}>
        <Typography fontSize={12}>
          数据来源: <Link href="https://wallhaven.cc/">wall haven</Link>{" "}
        </Typography>
        <Typography fontSize={12}>
          &copy;Copyright 2021-2022 by SanPhantom, All Rights Reserved.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AppFooter;
