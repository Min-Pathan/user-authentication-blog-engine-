import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Alert,
  Box,
  Button,
} from "@mui/material";

import useBlogLikes from
  "../../features/likes/queries/useBlogLikes.js";

import useToggleLike from
  "../../features/likes/mutations/useToggleLike.js";

function LikeButton({ blogId, initialCount = 0 }) {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const userId = user?.id;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useBlogLikes(blogId, userId, isAuthenticated);

  const {
    mutate,
    isPending,
    isError: isToggleError,
    error: toggleError,
    reset,
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

  const currentError = isAuthenticated
    ? (toggleError || error)
    : null;

  const showError =
    isAuthenticated && (isError || isToggleError);

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (busy || isError) return;

    reset();
    mutate();
  };

  const handleRefreshStatus = () => {
    reset();
    void refetch();
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

      {showError && (
        <Alert
          severity="error"
          sx={{ mt: 1 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleRefreshStatus}
              disabled={busy}
            >
              Refresh
            </Button>
          }
        >
          {currentError?.response?.status === 401
            ? "Your session has expired. Please log in again."
            : currentError?.response?.data?.message ||
              "Could not update or load likes. Refresh to check the saved status."}
        </Alert>
      )}
    </Box>
  );
}

export default LikeButton;