import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Clear from "@mui/icons-material/Clear";

import SearchIcon from "@mui/icons-material/Search";

const HeroSection = ({
  searchInput,
  setSearchInput,
  onSearch,
  onClear,
}) => {
  const handleSubmit = (
    event,
  ) => {
    event.preventDefault();

    onSearch();
  };
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
            component="form"
            onSubmit={handleSubmit}
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
            <TextField
              fullWidth
              placeholder="Search articles..."
              size="medium"
              value={searchInput}
              onChange={(event) =>
                setSearchInput(
                  event.target.value,
                )
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color:
                            "text.secondary",
                        }}
                      />
                    </InputAdornment>
                  ),

                  endAdornment:
                    searchInput ? (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          type="button"
                          onClick={onClear}
                          edge="end"
                          aria-label="Clear search"
                        >
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                },
              }}
            />

            <Button
              type="submit"
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