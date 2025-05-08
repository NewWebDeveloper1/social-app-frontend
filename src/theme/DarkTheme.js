import { createTheme } from "@mui/material/styles";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(88,199,250)",
    },
    secondary: {
      main: "#0288d1",
    },
    background: {
      main: "#212534",
      default: "#212534",
    },
    text: {
      default: "#fff",
    },
  },
});
