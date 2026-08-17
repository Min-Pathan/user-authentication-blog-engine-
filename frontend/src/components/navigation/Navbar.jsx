import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material"
const Navbar = () => {
    const navItems = [
        "Home", "Blogs", "Categories", "About", "Contact"
    ]
    return (
        <AppBar position="static" color="transparent" elevation={0}
            sx={{
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                bordercolor: "divider"
            }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ minHeight: 72 }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 800, color: "text.primary", letterSpacing: "-0.03em", cursor: 'pointer'
                    }}>
                        Blogger
                        <Box
                            component="span"
                            sx={{
                                color: "primary.main",
                            }}
                        >
                            .
                        </Box>
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ ml: 6 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                color="inherit"
                                sx={{
                                    color: item === "Home" ? "primary.main" : "text.secondary",
                                    fontWeight:
                                        item === "Home"
                                            ? 600
                                            : 500,
                                    "&:hover": {
                                        color: "primary.main",
                                        bgcolor: "transparent",
                                    },
                                }}>
                                {item}
                            </Button>
                        ))}
                    </Stack>

                    <Box sx={{ flexGrow: 1}} />

                    <Stack direction={"row"} spacing={1.5}>
                        <Button
                            variant="text"
                            sx={{
                                color: "text.primary",
                            }}
                        >
                            Login
                        </Button>

                        <Button
                            variant="contained"
                            disableElevation
                        >
                            Register
                        </Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar
