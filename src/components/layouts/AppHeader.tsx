import { Settings } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, useTheme, Divider } from '@mui/material';
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
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        color: 'common.black',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'common.black' }}
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
              if (e.code === 'Enter') {
                onSearch?.();
              }
            }}
          />
        </Search>
        <IconButton sx={{ ml: 1 }} onClick={onSetting}>
          <Settings htmlColor={theme.palette.common.black} />
        </IconButton>
      </Toolbar>
      <Divider sx={{ width: '100%' }} />
    </AppBar>
  );
};

export default AppHeader;
