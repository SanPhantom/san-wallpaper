import "./App.less";
import { ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import ImgCanvas from "./pages/ImgCanvas";

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
      {/* <Home /> */}
      <ImgCanvas />
    </ThemeProvider>
  );
};

export default App;
