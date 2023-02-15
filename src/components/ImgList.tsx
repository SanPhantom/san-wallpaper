import React from "react";
import { useCreation, useBoolean, useMount } from "ahooks";
import { Masonry } from "@mui/lab";
import { Box, Paper, styled } from "@mui/material";
import "./waterfall.less";

interface IImgListProps {
  list: any[];
  loading: boolean;
}

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const ImgList = ({ list, loading }: IImgListProps) => {
  return (
    <Box sx={{ pt: 10, boxSizing: "border-box" }}>
      <Masonry columns={5}>
        {list.map((item, index) => (
          <div className="img-card" key={item.id}>
            <Label>{index + 1}</Label>
            <img
              loading="lazy"
              src={item.thumbs.original}
              className="waterfall-img"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: "block",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Masonry>
    </Box>
  );
};

export default ImgList;
