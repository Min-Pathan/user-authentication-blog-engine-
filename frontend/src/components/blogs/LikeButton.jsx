import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Box,
  Button,
} from "@mui/material";

import useBlogLikes from
  "../../features/likes/queries/useBlogLikes.js";

import useToggleLike from
  "../../features/likes/mutations/useToggleLike.js";

import { useToast } from "../../context/ToastContext.js";

function LikeButton({ blogId, initialCount = 0 }) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const userId = user?.id;

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useBlogLikes(blogId, userId, isAuthenticated);

  const {
    mutate,
    isPending,
  } = useToggleLike(blogId, userId);

  const liked =
    isAuthenticated &&
    Boolean(data?.likedByCurrentUser);

  const count = isAuthenticated
    ? (data?.likeCount ?? initialCount)
    : initialCount;

  const busy =
    isAuthenticated &&
    (isLoading || isFetching || isPending);

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (busy || isError) return;

    mutate(undefined, {
      onError: (error) => {
        if (error?.response?.status === 401) return;

        showToast(
          error?.response?.data?.message ||
          "Could not update your like. Please try again.",
          "error",
        );
      },
    });
  };

  return (
    <Box>
      <Button
        type="button"
        onClick={handleLike}
        disabled={
          busy || (isAuthenticated && isError)
        }
        aria-label={
          !isAuthenticated
            ? "Log in to like this blog"
            : liked
              ? "Unlike this blog"
              : "Like this blog"
        }
        aria-pressed={liked}
        startIcon={
          liked ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )
        }
        sx={{
          minWidth: 0,
          color: liked
            ? "error.main"
            : "text.secondary",
        }}
      >
        {count}
      </Button>
    </Box>
  );
}

export default LikeButton;