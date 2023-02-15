import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../components/Search";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  useSetState,
  useCreation,
  useBoolean,
  useMemoizedFn,
  useInfiniteScroll,
} from "ahooks";
import { search } from "../services/paper";
import { useRef } from "react";
import ImgList from "../components/ImgList";

const Home = () => {
  const [state, setState] = useSetState({
    search: "",
    imgList: [] as any[],
  });
  const [loading, { setTrue: openLoading, setFalse: closeLoading }] =
    useBoolean(false);
  const targetRef = useRef();

  const queryPhotos = useMemoizedFn(async () => {
    openLoading();
    const { data } = await search({ page: 1 });
    setState({
      imgList: data,
    });
    closeLoading();
  });

  const { data } = useInfiniteScroll(
    (preData: any) => {
      return new Promise<any>((resolve) => {
        search({
          page: (preData?.meta.current_page ?? 0) + 1,
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
    }
  );

  // useCreation(() => {
  //   queryPhotos();
  // }, []);

  return (
    <Box ref={targetRef} sx={{ px: 2, height: "100%", overflow: "auto" }}>
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
            />
          </Search>
        </Toolbar>
      </AppBar>
      <ImgList list={data?.list ?? []} loading={loading} />
    </Box>
  );
};

export default Home;
