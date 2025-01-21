import { colors, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: "dark",
    background: {
      default: "#F4F6F8",
      paper: colors.common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#5664d2",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.23)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(0, 0, 0, 0.87)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3f51b5",
            },
          },
        },
      },
    },
  },
});

export { theme };
