import { Box, Chip, Container, Stack, Typography } from "@mui/material"
import { useState } from "react"

const categories = [
  "All",
  "React",
  "JavaScript",
  "Node.js",
  "Career",
  "Design",
];

const CategoryFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
    }
    return (
        <Box component="section" sx={{
            bgcolor: "background.default",
        }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        py: {
                            xs: 4,
                            md: 5,
                        },
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            fontWeight: 700,
                        }}
                    >
                        Explore by topic
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {categories.map((category) => {
                            const isSelected = selectedCategory === category;
                            return (
                                <Chip key={category}
                                    label={category} clickable aria-pressed={isSelected}
                                    onClick={() => handleCategoryChange(category)}
                                    sx={{
                                        px: 0.5, fontWeight: 500,
                                        bgcolor: isSelected ? 'primary.main' : 'background.paper',
                                        color: isSelected ? 'primary.contrastText' : 'text.secondary',
                                        border: '1px solid',
                                        borderColor: isSelected
                                            ? "primary.main"
                                            : "divider",

                                        "&:hover": {
                                            bgcolor: isSelected
                                                ? "primary.dark"
                                                : "#EFF6FF",

                                            color: isSelected
                                                ? "primary.contrastText"
                                                : "primary.main",
                                        }
                                    }}
                                />
                            )
                        })}
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}

export default CategoryFilter
