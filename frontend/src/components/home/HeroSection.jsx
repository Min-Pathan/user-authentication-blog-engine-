import {
  Box,
  Button,
  Chip,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const HeroSection = () => {
  return (
    <Box component="section"
      sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth='lg'>
        <Box
          sx={{
            py: {
              xs: 7,
              sm: 9,
              md: 11,
            },

            textAlign: "center",
          }}>
          <Chip label="Our Blog" size="small"
            sx={{
              mb: 3, bgcolor: "#EFF6FF", color: "primary.main", fontWeight: 600
            }} />
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2.25rem",
                sm: "3rem",
                md: "4rem",
              },

              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "text.primary",
            }}
          >
            Stories worth sharing.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              mt: 2.5,
              mx: "auto",
              maxWidth: 650,

              fontSize: {
                xs: "1rem",
                md: "1.1rem",
              },

              lineHeight: 1.8,
            }}
          >
            Discover tutorials, ideas, experiences, and perspectives from
            writers across our growing community.
          </Typography>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.5}
            sx={{
              mt: 4,
              mx: "auto",
              maxWidth: 650,
              alignItems: "stretch",
            }}
          >
            <TextField fullWidth placeholder="Search article..." size="medium"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{
                        color: "text.secondary",
                      }} />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "background.paper",

                  "& fieldset": {
                    borderColor: "divider",
                  },
                  "&:hover fieldset": {
                    borderColor: 'primary.light'
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                }
              }}
            />
            <Button
              variant="contained"
              size="large"
              disableElevation
              sx={{
                px: 4,
                whiteSpace: "nowrap",

                minHeight: {
                  xs: 52,
                  sm: "auto",
                },
              }}
            >
              Search
            </Button>

          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection