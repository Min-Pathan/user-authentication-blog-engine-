import SearchIcon from '@mui/icons-material/Search'
import { Box, Chip, InputAdornment, Stack, TextField } from "@mui/material"

const categories = [
  "All",
  "React",
  "JavaScript",
  "Node.js",
  "Career",
  "Design",
];

const BlogFilters = ({ search, onSearchChange, selectedCategory, onCategorychange }) => {

    return (
        <Box>
            <TextField fullWidth
                value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search by title, content, or author..."
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        )
                    }
                }}

                sx={{
                    maxWidth: 650,
                    "& .MuiOutlinedInput-root": {
                        bgcolor: 'background.paper'
                    }
                }} />
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2.5 }}>
                {categories.map((category) => {
                    const isSelected = category === selectedCategory;

                    return (
                        <Chip key={category} label={category} clickable onClick={() =>
                            onCategorychange(category)}
                            sx={{
                                bgcolor: isSelected
                                    ? "primary.main"
                                    : "background.paper",

                                color: isSelected
                                    ? "primary.contrastText"
                                    : "text.secondary",

                                border: "1px solid",

                                borderColor: isSelected
                                    ? "primary.main"
                                    : "divider",
                                "&:hover": {
                                    bgcolor: isSelected ? 'primary.dark' : '#EFF6FF',
                                    color: isSelected ? "primary.contrastText" : "primary.main",
                                }
                            }}

                        />
                    )
                })}
            </Stack>
        </Box>
    )
}

export default BlogFilters
