import {
  Box,
  Chip,
} from "@mui/material";

function CategoryFilter({
  categories,
  selectedCategoryId,
  onCategoryChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      <Chip
        label="All"
        clickable
        color={
          !selectedCategoryId
            ? "primary"
            : "default"
        }
        variant={
          !selectedCategoryId
            ? "filled"
            : "outlined"
        }
        onClick={() =>
          onCategoryChange(
            null,
          )
        }
      />

      {categories.map(
        (category) => (
          <Chip
            key={
              category.id
            }
            label={
              category.name
            }
            clickable
            color={
              selectedCategoryId ===
              category.id
                ? "primary"
                : "default"
            }
            variant={
              selectedCategoryId ===
              category.id
                ? "filled"
                : "outlined"
            }
            onClick={() =>
              onCategoryChange(
                category.id,
              )
            }
          />
        ),
      )}
    </Box>
  );
}

export default CategoryFilter;