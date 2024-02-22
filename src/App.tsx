import './App.less';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home';
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
