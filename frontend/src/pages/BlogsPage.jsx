import {
  useState,
} from "react";

import {
  Alert,
  Box,
  Container,
  Typography,
} from "@mui/material";

import useBlogs from "../features/blogs/queries/useBlogs.js";
import BlogGrid from "../components/blogs/BlogsGrid.jsx";
import BlogFilters from "../components/blogs/BlogFilters.jsx";
import PaginationCustom from "../components/common/PaginationCustom.jsx";
import CardSkeleton from "../components/common/CardSkeleton.jsx";

function BlogsPage() {
  const [page, setPage] = useState(1);

  const [itemPerPage, setItemPerPage] = useState(6);

  const [searchInput, setSearchInput] = useState("");

  const [keyword, setKeyword] = useState("");

  const {
    data,
    isFetching,
    isError,
    error,
  } = useBlogs({
    page,
    limit: itemPerPage,
    keyword,
  });

  const blogs = data?.blogs ?? [];

  const totalBlogs = data?.totalBlogs ?? 0;

  const handleSearch = () => {
    setPage(1);

    setKeyword(
      searchInput.trim(),
    );
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setKeyword("");
    setPage(1);
  };

  // if (isLoading) {
  //   return (

  //   );
  // }

  if (isError) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
        }}
      >
        <Alert severity="error">
          {error?.response?.data
            ?.message ||
            "Failed to load blogs."}
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: {
          xs: 4,
          md: 7,
        },
      }}
    >
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Explore Blogs
        </Typography>

        <Typography
          color="text.secondary"
        >
          Discover stories,
          ideas and articles
          from our community.
        </Typography>
      </Box>

      <BlogFilters
        searchInput={
          searchInput
        }
        setSearchInput={
          setSearchInput
        }
        onSearch={
          handleSearch
        }
        onClear={
          handleClearSearch
        }
      />

         {isFetching ? (
        <CardSkeleton
          count={3}
          imageHeight={220}
        />
      ) : blogs.length > 0 ? (
        <>
          <BlogGrid
            blogs={blogs}
          />

          <PaginationCustom
            page={page}
            rowCount={
              totalBlogs
            }
            itemPerPage={
              itemPerPage
            }
            setCurrentPage={
              setPage
            }
            setItemPerPage={
              setItemPerPage
            }
          />
        </>
      ) : (
        <Box
          sx={{
            py: 10,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
            }}
          >
            No blogs found
          </Typography>

          <Typography
            color="text.secondary"
          >
            Try another search
            keyword.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default BlogsPage;