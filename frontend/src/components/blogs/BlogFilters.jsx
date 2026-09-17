import Clear from "@mui/icons-material/Clear";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";


function BlogFilters({
  searchInput,
  setSearchInput,
  onSearch,
  onClear,
}) {
  const handleSubmit = (
    event,
  ) => {
    event.preventDefault();

    onSearch();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 1.5,
        mb: 4,
        maxWidth: 650,
      }}
    >
      <TextField
        fullWidth
        size="small"
        label="Search blogs"
        placeholder="Search by title, content or author..."
        value={searchInput}
        onChange={(event) =>
          setSearchInput(
            event.target.value,
          )
        }
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small"
                  type="button"
                  onClick={onClear}
                  edge="end"
                  aria-label={"clear"}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}

export default BlogFilters;