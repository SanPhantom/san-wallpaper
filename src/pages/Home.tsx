import {
  Toolbar,
  Box,
  CssBaseline,
  Stack,
  CircularProgress,
  alpha,
  Slide,
  Typography,
} from "@mui/material";
import { useSetState, useInfiniteScroll, useBoolean } from "ahooks";
import { search } from "../services/paper";
import { useRef } from "react";
import Waterfall from "../components/Waterfall";
import ImgFullDrawer from "../components/ImgFullDrawer";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import ScrollTopFab from "../components/ScrollTopFab";
import SearchContextDrawer, {
  SearchDataType,
} from "../components/SearchContextDrawer";
import Loading from "../components/Loading";

const Home = () => {
  const [state, setState] = useSetState({
    search: "",
    selectItem: undefined as any,
  });
  const [searchData, setSearchData] = useSetState<SearchDataType>({
    categories: ["general", "anime"],
    purity: ["sfw"],
    sorting: ["date_added"],
    atleast: ["1920x1080"],
  });
  const [showDrawer, { setTrue: openDrawer, setFalse: closeDrawer }] =
    useBoolean(false);
  const [
    showScrollTop,
    { setTrue: openShowScrollTop, setFalse: closeShowScrollTop },
  ] = useBoolean(false);
  const [
    settingDrawer,
    { setTrue: openSettingDrawer, setFalse: closeSettingDrawer },
  ] = useBoolean(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const { data, loading, reload, loadMore, loadingMore } = useInfiniteScroll(
    async (preData: any) => {
      try {
        const { data, ...res } = await search({
          page: (preData?.meta.current_page ?? 0) + 1,
          q: state.search,
          categories: ["general", "anime", "people"]
            .map((d: any) => Number(searchData.categories?.includes(d)))
            .join(""),
          purity:
            ["sfw", "sketchy"]
              .map((d: any) => Number(searchData.purity?.includes(d)))
              .join("") + "0",
          sorting: searchData.sorting?.[0],
          atleast: searchData.atleast?.[0],
        });
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              list: data.map((item: any) => ({
                ...item,
                src: item.thumbs.original,
              })),
              meta: (res as any).meta!,
            });
          }, 1000);
        });
      } catch (error) {
        loadMore();
      }
      return new Promise<any>(async (resolve) => {});
    },
    {
      target: targetRef,
      threshold: 200,
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
      <AppHeader
        searchValue={state.search}
        onChange={(search) => setState({ search })}
        onSearch={reload}
        onSetting={settingDrawer ? closeSettingDrawer : openSettingDrawer}
      />

      <Stack component="main" sx={{ flexGrow: 1, width: "100%", minHeight: 1 }}>
        <Toolbar />
        <Box
          ref={targetRef}
          sx={{ flexGrow: 1, p: 2, overflowY: "scroll", position: "relative" }}
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
          {(loading || loadingMore) && <Loading />}
          <ScrollTopFab containerRef={targetRef} isShow={showScrollTop} />
        </Box>
        <AppFooter />
      </Stack>
      <SearchContextDrawer
        searchData={searchData}
        onDataChange={setSearchData}
        open={settingDrawer}
        onClose={closeSettingDrawer}
        onSubmit={reload}
      />

      <ImgFullDrawer
        open={showDrawer}
        item={state.selectItem}
        onClose={closeDrawer}
      />
    </Stack>
  );
};

export default Home;
