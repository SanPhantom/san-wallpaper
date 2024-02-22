import React, { useRef } from 'react';
import { Box, CssBaseline, Stack, Toolbar } from '@mui/material';
import AppHeader from '../components/layouts/AppHeader';
import PictureContent from '../components/PictureContent';
import AppFooter from '../components/layouts/AppFooter';
import NewPictureContent from '../components/NewPictureContent';

const NewHome = () => {
  const targetRef = useRef<{ reload: () => void }>();
  return (
    <Stack sx={{ height: '100%' }}>
      <CssBaseline />
      <AppHeader />
      <Stack component="main" sx={{ flexGrow: 1, width: '100%', minHeight: 1 }}>
        <Toolbar />
        <NewPictureContent />
        <AppFooter />
      </Stack>
    </Stack>
  );
};

export default NewHome;
