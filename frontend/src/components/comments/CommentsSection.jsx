import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useComments from "../../features/comments/queries/useComments";
import { useState } from "react";
import { useSelector } from "react-redux";
import useCreateComment from "../../features/comments/mutations/useCreateComment";
import { Link } from "react-router";
import { useToast } from "../../context/ToastContext.js";
import CommentItem from "./CommentItem";

function CommentsSection({ blogId }) {
  const [commentText, setCommentText] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { showToast } = useToast();

const {
  mutate: postComment,
  isPending: isPosting,
} = useCreateComment();

  const trimmedComment = commentText.trim();
  const handlePostComment = (event) => {
    event.preventDefault();
    if (!isAuthenticated || isPosting || trimmedComment.length < 2 || trimmedComment.length > 200) {
      return;
    }
    postComment(
      {
        comment: trimmedComment, blog_id: blogId
      },
      {
        onSuccess: () => {
          setCommentText("")
        },
        onError: (error) => {
          if (error?.response?.status === 401) return;

          showToast(
            error?.response?.data?.message ||
            "Could not post your comment. Please try again.",
            "error",
          );
        },
      }
    )
  }
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useComments(blogId);

  const comments = data?.comments ?? [];

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800 }}
      >
        Comments ({data?.count ?? 0})
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 0.75, mb: 3 }}
      >
        Join the conversation and share your thoughts.
      </Typography>
      {isAuthenticated ? (
        <Paper
          component="form"
          onSubmit={handlePostComment}
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <TextField
            label="Your comment"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            multiline
            rows={3}
            fullWidth
            disabled={isPosting}
            error={trimmedComment.length > 200}
            helperText={`${trimmedComment.length}/200 characters · Minimum 2`}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ mt: 2 }}
          >
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={
                isPosting ||
                trimmedComment.length < 2 ||
                trimmedComment.length > 200
              }
            >
              {isPosting ? "Posting..." : "Post Comment"}
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Alert severity="info" sx={{ mb: 4 }}>
          <Link to="/login">Log in</Link> to post a comment.
        </Alert>
      )}
      {isLoading && (
        <Stack spacing={2}>
          {[1, 2].map((item) => (
            <Paper
              key={item}
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton width={120} />
                  <Skeleton width="85%" />
                  <Skeleton width="60%" />
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      {isError && (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            {error?.response?.data?.message ||
              "Could not load comments. Please try again."}
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            Retry
          </Button>
        </Box>
      )}

      {!isLoading && !isError && comments.length > 0 && (
        <Stack spacing={2}>
         {comments.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        blogId={blogId}
      />
    ))}
        </Stack>
      )}

      {!isLoading && !isError && comments.length === 0 && (
        <>
          <Divider sx={{ mb: 3 }} />

          <Typography
            color="text.secondary"
            textAlign="center"
          >
            No comments yet. Be the first to comment.
          </Typography>
        </>
      )}
    </Box>
  );
}

export default CommentsSection;
