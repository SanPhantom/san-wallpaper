import "./App.less";
import { ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#d23918",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
