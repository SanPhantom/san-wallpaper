import "./App.less";
import { ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import ImgCanvas from "./pages/ImgCanvas";
import CanvasBg from "./pages/CanvasBg";

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
      {/* <CanvasBg /> */}
    </ThemeProvider>
  );
};

export default App;
