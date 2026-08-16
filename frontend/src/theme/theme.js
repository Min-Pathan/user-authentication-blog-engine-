import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#5B5BD6",
            dark: "#4646B8",
            light: "#7C7CE5",
        },
        secondary: {
            main: "#FF7A59",
        },
        background: {
            default: "#F7F7FB",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#18181B",
            secondary: "#6B7280",
        },
    },
    typography: {
        fontFamily: [
            "Inter",
            "system-ui",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "sans-serif",
        ].join(","),
        h1: {
            fontWeight: 800,
            letterSpacing: "-0.04em"
        },
        h2: {
            fontWeight: 750,
            letterSpacing: "-0.03em",
        },

        h3: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 700,
        },

        h6: {
            fontWeight: 700,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 14
    },
    components: {
        MuiButton: {
            styleOverrides: {
                rott: {
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    boxShadow: "none",
                }
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 18,
                boxShadow: "0 8px 30px rgba(24, 24, 27, 0.06)",
            },
        },
    },
})

export default theme;