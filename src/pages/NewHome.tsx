import React from 'react';
import { CssBaseline, Stack, Toolbar } from '@mui/material';
import AppHeader from '../components/layouts/AppHeader';
import AppFooter from '../components/layouts/AppFooter';
import NewPictureContent from '../components/NewPictureContent';

const NewHome = () => {
  return (
    <Stack sx={{ height: '100%' }}>
      <CssBaseline />
      <AppHeader />
      <Stack component="main" sx={{ width: '100%' }}>
        <Toolbar />
        <NewPictureContent />
        <div style={{ height: 56 }}></div>
      </Stack>
      <AppFooter />
    </Stack>
  );
};

export default NewHome;
