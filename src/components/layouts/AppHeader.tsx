import { Settings } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, useTheme } from '@mui/material';
import React from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from '../common/Search';
import { Search as SearchIcon } from '@mui/icons-material';

interface IAppHeaderProps {
  searchValue?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  onSetting?: () => void;
}

const AppHeader = ({ searchValue, onSearch, onChange, onSetting }: IAppHeaderProps) => {
  const theme = useTheme();

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          San Wallpaper
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={(v) => onChange?.(v.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                onSearch?.();
              }
            }}
          />
        </Search>
        <IconButton sx={{ ml: 1 }} onClick={onSetting}>
          <Settings htmlColor={theme.palette.common.white} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
