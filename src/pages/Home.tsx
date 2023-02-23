import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
  CssBaseline,
  Tooltip,
  Fab,
  Fade,
  Stack,
  Divider,
  Link,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../components/Search";
import {
  ExpandLess,
  Search as SearchIcon,
  Settings,
} from "@mui/icons-material";
import { useSetState, useInfiniteScroll, useBoolean } from "ahooks";
import { search } from "../services/paper";
import { useRef } from "react";
import Waterfall from "../components/Waterfall";
import ImgFullDrawer from "../components/ImgFullDrawer";

const Home = () => {
  const theme = useTheme();
  const [state, setState] = useSetState({
    search: "",
    selectItem: undefined as any,
  });
  const [showDrawer, { setTrue: openDrawer, setFalse: closeDrawer }] =
    useBoolean(false);
  const [
    showScrollTop,
    { setTrue: openShowScrollTop, setFalse: closeShowScrollTop },
  ] = useBoolean(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const { data, loading, reload, loadMore } = useInfiniteScroll(
    (preData: any) => {
      return new Promise<any>(async (resolve) => {
        const { data, ...res } = await search({
          page: (preData?.meta.current_page ?? 0) + 1,
          q: state.search,
        });
        resolve({
          list: data.map((item: any) => ({
            ...item,
            src: item.thumbs.original,
          })),
          meta: (res as any).meta!,
        });
      });
    },
    {
      target: targetRef,
      reloadDeps: [],
      isNoMore(data) {
        return (data?.meta.current_page ?? 0) >= (data?.meta.last_page ?? -1);
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );

  return (
    <Stack sx={{ height: "100%" }}>
      <CssBaseline />
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

      <Stack component="main" sx={{ flexGrow: 1, width: "100%", minHeight: 1 }}>
        <Toolbar />
        <Box
          ref={targetRef}
          sx={{ flexGrow: 1, p: 2, overflow: "auto" }}
          onScroll={(e) => {
            if ((e.target as HTMLElement).scrollTop !== 0) {
              openShowScrollTop();
            } else {
              closeShowScrollTop();
            }
          }}
        >
          <Waterfall
            list={data?.list ?? []}
            cols={{ xs: 2, sm: 4, lg: 5, xl: 8 }}
            spacing={2}
            onItemShow={(item) => {
              setState({
                selectItem: item,
              });
              openDrawer();
            }}
          />
          {showScrollTop && (
            <Tooltip title="滚动到顶部">
              <Fab
                size="small"
                color="primary"
                sx={{ position: "fixed", bottom: 32, right: 32 }}
                onClick={() => {
                  targetRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ExpandLess />
              </Fab>
            </Tooltip>
          )}
        </Box>
        <Stack alignItems={"center"}>
          <Divider sx={{ width: "100%" }} />
          <Stack alignItems={"center"} spacing={1} sx={{ py: 2 }}>
            <Typography fontSize={14}>
              数据来源: <Link href="https://wallhaven.cc/">wall haven</Link>{" "}
            </Typography>
            <Typography fontSize={14}>
              &copy;Copyright 2021-2022 by SanPhantom, All Rights Reserved.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ImgFullDrawer
        open={showDrawer}
        item={state.selectItem}
        onClose={closeDrawer}
      />
    </Stack>
  );
};

export default Home;
