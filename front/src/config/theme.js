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
