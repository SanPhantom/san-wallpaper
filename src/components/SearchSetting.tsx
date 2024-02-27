import React, { useCallback, useEffect, useState } from 'react';
import { IconButton, Stack, useTheme } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useBoolean } from 'ahooks';
import SearchContextDrawer from './SearchContextDrawer';
import { useAtom, useAtomValue } from 'jotai';
import usePaperPagination, { searchAtom } from '../atoms/paper.atom';

const SearchSetting = () => {
  const theme = useTheme();

  const [dialogOpen, { setTrue: openDialog, setFalse: closeDialog }] = useBoolean(false);
  const [searchData, setSearchData] = useAtom(searchAtom);
  const { reload } = usePaperPagination();

  const [currentSearchData, setCurrentSearchData] = useState({ ...searchData });

  const handleSearchSubmit = useCallback(() => {
    setSearchData(currentSearchData);
    reload();
    closeDialog();
  }, [currentSearchData, setSearchData]);

  return (
    <Stack>
      <IconButton sx={{ ml: 1 }} onClick={openDialog}>
        <Settings htmlColor={theme.palette.common.black} />
      </IconButton>
      {dialogOpen && (
        <SearchContextDrawer
          searchData={currentSearchData}
          onClose={closeDialog}
          onDataChange={(value) => {
            setCurrentSearchData({
              ...currentSearchData,
              ...value,
            });
          }}
          onSubmit={handleSearchSubmit}
        />
      )}
    </Stack>
  );
};

export default SearchSetting;
