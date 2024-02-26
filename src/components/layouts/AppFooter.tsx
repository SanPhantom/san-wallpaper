import { Stack, Divider, Typography, Link } from '@mui/material';

const AppFooter = () => {
  return (
    <Stack
      alignItems={'center'}
      sx={{
        height: 56,
        width: '100%',
        bgcolor: 'common.white',
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}
    >
      <Divider sx={{ width: '100%' }} />
      <Stack alignItems={'center'} spacing={0.4} sx={{ py: 1 }}>
        <Typography fontSize={12}>
          数据来源: <Link href="https://wallhaven.cc/">wall haven</Link>{' '}
        </Typography>
        <Typography fontSize={12}>
          Copyright &copy; 2021-2022 by SanPhantom, All Rights Reserved.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AppFooter;
