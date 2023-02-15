import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../components/Search";
import { Search as SearchIcon, Settings } from "@mui/icons-material";
import { useSetState, useInfiniteScroll } from "ahooks";
import { search } from "../services/paper";
import { useRef } from "react";
import Waterfall from "../components/Waterfall";

const Home = () => {
  const theme = useTheme();
  const [state, setState] = useSetState({
    search: "",
  });
  const targetRef = useRef();

  const { data, loading, reload } = useInfiniteScroll(
    (preData: any) => {
      return new Promise<any>((resolve) => {
        search({
          page: (preData?.meta.current_page ?? 0) + 1,
          q: state.search,
        }).then((res: any) => {
          resolve({
            list: res.data,
            meta: res.meta,
          });
        });
      });
    },
    {
      target: targetRef,
      reloadDeps: [],
      threshold: 200,
      isNoMore(data) {
        return (data?.meta.current_page ?? 0) >= (data?.meta.last_page ?? -1);
      },
    }
  );

  return (
    <Box
      ref={targetRef}
      sx={{
        pt: 10,
        px: 2,
        height: "100%",
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            San Wallpaper
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={state.search}
              onChange={(v) => setState({ search: v.target.value })}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  reload();
                }
              }}
            />
          </Search>
          <IconButton sx={{ ml: 1 }}>
            <Settings htmlColor={theme.palette.common.white} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Waterfall
        list={data?.list ?? []}
        cols={{ xs: 2, sm: 4, lg: 6 }}
        spacing={2}
      />
    </Box>
  );
};

export default Home;
