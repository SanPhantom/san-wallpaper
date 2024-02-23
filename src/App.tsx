import './App.less';
import { createTheme, ThemeProvider } from '@mui/material';
import NewHome from './pages/NewHome';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#d23918',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NewHome />
    </ThemeProvider>
  );
};

export default App;
