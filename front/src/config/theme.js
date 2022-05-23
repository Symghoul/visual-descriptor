import { createTheme, styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#6a6fea",
      main: "#2E44B7",
      dark: "#001e86",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#6fd2ff",
      main: "#2AA1E4",
      dark: "#0073b2",
      contrastText: "#000000",
    },
  },
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#001e86",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#6a6fea",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2E44B7",
    },
    "&:hover fieldset": {
      borderColor: "#6a6fea",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#001e86",
    },
  },
});

export { theme, CssTextField };

export default theme;
