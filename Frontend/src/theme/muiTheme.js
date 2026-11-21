
import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  cssVariables: true,

  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
      light: "#E0F2FE",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#0D9488",
      light: "#F0FDFA",
      dark: "#0F766E",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#102A43",
      secondary: "#64748B",
    },

    divider: "#E2E8F0",

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#D97706",
    },

    error: {
      main: "#DC2626",
    },

    info: {
      main: "#2563EB",
    },
  },

  typography: {
    fontFamily: "var(--wl-font-english)",

    h1: {
      fontWeight: 800,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "var(--wl-radius-md)",
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          transition: "var(--wl-transition-normal)",
        },

        contained: {
          "&:hover": {
            boxShadow: "var(--wl-shadow-md)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "var(--wl-radius-lg)",
          border: "1px solid var(--wl-border)",
          boxShadow: "var(--wl-shadow-sm)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default muiTheme;
