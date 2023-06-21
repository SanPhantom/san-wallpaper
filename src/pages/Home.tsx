import { CssBaseline, Stack, Toolbar } from "@mui/material";
import { useBoolean, useSetState } from "ahooks";
import { useRef, useState } from "react";
import PictureContent from "../components/PictureContent";
import SearchContextDrawer from "../components/SearchContextDrawer";
import AppFooter from "../components/layouts/AppFooter";
import AppHeader from "../components/layouts/AppHeader";
import { SearchDataType } from "../types";

const Home = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchData, setSearchData] = useSetState<SearchDataType>({
    categories: ["general", "anime"],
    purity: ["sfw"],
    sorting: ["date_added"],
    atleast: ["1920x1080"],
  });
  const [showDrawer, { setTrue: openDrawer, setFalse: closeDrawer }] =
    useBoolean(false);

  const [
    settingDrawer,
    { setTrue: openSettingDrawer, setFalse: closeSettingDrawer },
  ] = useBoolean(false);
  const targetRef = useRef<{ reload: () => void }>();

  return (
    <Stack sx={{ height: "100%" }}>
      <CssBaseline />
      <AppHeader
        searchValue={searchKey}
        onChange={(search) => setSearchKey(search)}
        onSearch={() => targetRef.current?.reload()}
        onSetting={settingDrawer ? closeSettingDrawer : openSettingDrawer}
      />

      <Stack component="main" sx={{ flexGrow: 1, width: "100%", minHeight: 1 }}>
        <Toolbar />
        <PictureContent
          ref={targetRef}
          searchData={searchData}
          searchKey={searchKey}
        />
        <AppFooter />
      </Stack>
      <SearchContextDrawer
        searchData={searchData}
        onDataChange={setSearchData}
        open={settingDrawer}
        onClose={closeSettingDrawer}
        onSubmit={() => targetRef.current?.reload()}
      />
    </Stack>
  );
};

export default Home;
