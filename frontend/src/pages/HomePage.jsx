import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Alert,
  Box,
  Container,
  Typography,
} from "@mui/material";

import HeroSection from "../components/home/HeroSection.jsx";
import CategoryFilter from "../components/home/CategoryFilter.jsx";
import FeaturedStory from "../components/home/FeaturedStory.jsx";
import LatestStories from "../components/home/LatestStories.jsx";

import CardSkeleton from "../components/common/CardSkeleton.jsx";

import useInfiniteBlogs from "../features/blogs/queries/useInfiniteBlogs.js";
import useCategories from "../features/categories/queries/useCategories.js";

function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState(null);

  const loadMoreRef =
    useRef(null);

  const {
    data: categoriesData,
  } = useCategories();

  const categories =
    categoriesData?.categories ??
    [];

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteBlogs({
    limit: 7,
    keyword,
    categoryId:
      selectedCategoryId,
  });

  const blogs =
    data?.pages.flatMap(
      (page) =>
        page.blogs ?? [],
    ) ?? [];

  const featuredBlog =
    blogs[0];

  const latestBlogs =
    blogs.slice(1);

  const handleCategoryChange = (
    categoryId,
  ) => {
    setSelectedCategoryId(
      categoryId,
    );
  };

  useEffect(() => {
    const element =
      loadMoreRef.current;

    if (
      !element ||
      !hasNextPage
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage();
          }
        },
        {
          root: null,
          rootMargin:
            "300px 0px",

          threshold: 0,
        },
      );

    observer.observe(
      element,
    );

    return () => {
      observer.disconnect();
    };
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  const showMainSkeleton =
    isLoading ||
    (isFetching &&
      !isFetchingNextPage);

  const handleSearch = () => {
    setKeyword(
      searchInput.trim(),
    );
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setKeyword("");
  };

  return (
    <>
      <HeroSection
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
        } />

      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 4,
            md: 6,
          },
        }}
      >
        {/* Categories */}
        <Box
          sx={{
            mb: 5,
          }}
        >
          <CategoryFilter
            categories={
              categories
            }
            selectedCategoryId={
              selectedCategoryId
            }
            onCategoryChange={
              handleCategoryChange
            }
          />
        </Box>

        {/* Initial/category loading */}
        {showMainSkeleton ? (
          <CardSkeleton
            count={3}
          />
        ) : isError ? (
          <Alert severity="error">
            {error?.response
              ?.data?.message ||
              "Failed to load blogs."}
          </Alert>
        ) : blogs.length ===
          0 ? (
          <Box
            sx={{
              py: 8,
              textAlign:
                "center",
            }}
          >
            <Typography variant="h6">
              No blogs found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {keyword
                ? `No stories found for "${keyword}".`
                : selectedCategoryId
                  ? "There are no stories in this category yet."
                  : "There are no stories available yet."}
            </Typography>
          </Box>
        ) : (
          <>
            {/* Featured */}
            {featuredBlog && (
              <FeaturedStory
                blog={
                  featuredBlog
                }
              />
            )}

            {/* All remaining blogs */}
            {latestBlogs.length >
              0 && (
                <LatestStories
                  blogs={
                    latestBlogs
                  }
                />
              )}

            {/* Next page loader */}
            {isFetchingNextPage && (
              <Box
                sx={{
                  mt: 4,
                }}
              >
                <CardSkeleton
                  count={3}
                />
              </Box>
            )}

            {/* Observer target */}
            <Box
              ref={
                loadMoreRef
              }
              sx={{
                height: 1,
              }}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default HomePage;