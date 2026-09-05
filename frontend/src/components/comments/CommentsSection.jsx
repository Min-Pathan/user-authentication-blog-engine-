import { useState } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const initialComments = [
  {
    id: 1,
    username: "Aarav",
    text: "Really useful article. The explanation was very clear.",
    isOwn: false,
  },
  {
    id: 2,
    username: "Minaz",
    text: "Thanks! Glad you found it useful.",
    isOwn: true,
  },
];

function CommentsSection() {
  const [comments, setComments] =
    useState(initialComments);

  const [commentText, setCommentText] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const handleAddComment = () => {
    const value = commentText.trim();

    if (!value) {
      return;
    }

    const newComment = {
      id: Date.now(),
      username: "Minaz",
      text: value,
      isOwn: true,
    };

    setComments((previous) => [
      newComment,
      ...previous,
    ]);

    setCommentText("");
  };

  const handleDeleteComment = (id) => {
    setComments((previous) =>
      previous.filter(
        (comment) => comment.id !== id,
      ),
    );
  };

  const handleStartEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = (id) => {
    const value = editText.trim();

    if (!value) {
      return;
    }

    setComments((previous) =>
      previous.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              text: value,
            }
          : comment,
      ),
    );

    setEditingId(null);
    setEditText("");
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
        }}
      >
        Comments ({comments.length})
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 0.75,
          mb: 3,
        }}
      >
        Join the conversation and share your thoughts.
      </Typography>

      {/* Add comment */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          mb: 4,
        }}
      >
        <TextField
          value={commentText}
          onChange={(event) =>
            setCommentText(event.target.value)
          }
          placeholder="Write a comment..."
          multiline
          rows={3}
          fullWidth
        />

        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            disableElevation
            disabled={!commentText.trim()}
            onClick={handleAddComment}
          >
            Post Comment
          </Button>
        </Stack>
      </Paper>

      {/* Comment list */}
      <Stack spacing={2}>
        {comments.map((comment) => (
          <Paper
            key={comment.id}
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
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "primary.main",
                }}
              >
                {comment.username
                  ?.charAt(0)
                  .toUpperCase()}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {comment.username}
                  </Typography>

                  {comment.isOwn &&
                    editingId !== comment.id && (
                      <Stack direction="row">
                        <IconButton
                          size="small"
                          aria-label="Edit comment"
                          onClick={() =>
                            handleStartEdit(
                              comment,
                            )
                          }
                        >
                          <EditOutlinedIcon
                            fontSize="small"
                          />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          aria-label="Delete comment"
                          onClick={() =>
                            handleDeleteComment(
                              comment.id,
                            )
                          }
                        >
                          <DeleteOutlineIcon
                            fontSize="small"
                          />
                        </IconButton>
                      </Stack>
                    )}
                </Stack>

                {editingId ===
                comment.id ? (
                  <Box sx={{ mt: 1.5 }}>
                    <TextField
                      value={editText}
                      onChange={(event) =>
                        setEditText(
                          event.target.value,
                        )
                      }
                      multiline
                      rows={2}
                      fullWidth
                    />

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 1.5 }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          handleSaveEdit(
                            comment.id,
                          )
                        }
                      >
                        Save
                      </Button>

                      <Button
                        size="small"
                        color="inherit"
                        onClick={
                          handleCancelEdit
                        }
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.75,
                      lineHeight: 1.7,
                    }}
                  >
                    {comment.text}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {comments.length === 0 && (
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