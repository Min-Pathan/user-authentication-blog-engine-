import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import useCommentActions from
    "../../features/comments/mutations/useCommentActions.js";
import { useToast } from "../../context/ToastContext.js";

function CommentItem({ comment, blogId }) {
    const { user, isAuthenticated } = useSelector(
        (state) => state.auth,
    );

    const { showToast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState("");
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { editMutation, deleteMutation } =
        useCommentActions(blogId);

    const isOwn =
        isAuthenticated &&
        user?.id != null &&
        comment.user_id != null &&
        Number(user.id) === Number(comment.user_id);

    const isBusy =
        editMutation.isPending || deleteMutation.isPending;

    const trimmedText = editText.trim();

    const formattedDate = new Date(
        comment.created_at,
    ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const handleStartEdit = () => {
        setEditText(comment.comment);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        if (isBusy) return;

        setIsEditing(false);
    };

    const handleSave = (event) => {
        event.preventDefault();

        if (
            !isOwn ||
            isBusy ||
            trimmedText.length < 2 ||
            trimmedText.length > 200
        ) {
            return;
        }

        editMutation.mutate(
            {
                id: comment.id,
                comment: trimmedText,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
                onError: (error) => {
                    if (error?.response?.status === 401) return;

                    showToast(
                        error?.response?.data?.message ||
                            "Could not update your comment. Please try again.",
                        "error",
                    );
                },
            },
        );
    };

    const handleOpenDelete = () => {
        setDeleteOpen(true);
    };

    const handleCloseDelete = () => {
        if (deleteMutation.isPending) return;

        setDeleteOpen(false);
    };

    const handleDelete = () => {
        if (!isOwn || isBusy) return;

        deleteMutation.mutate(comment.id, {
            onSuccess: () => {
                setDeleteOpen(false);
            },
            onError: (error) => {
                if (error?.response?.status === 401) return;

                showToast(
                    error?.response?.data?.message ||
                        "Could not delete your comment. Please try again.",
                    "error",
                );
            },
        });
    };

    return (
        <>
            <Paper
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
                        {comment.username?.charAt(0).toUpperCase() || "?"}
                    </Avatar>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                            {comment.username}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {formattedDate}
                        </Typography>

                        {isOwn && isEditing ? (
                            <Box
                                component="form"
                                onSubmit={handleSave}
                                sx={{ mt: 1.5 }}
                            >
                                <TextField
                                    label="Edit comment"
                                    value={editText}
                                    onChange={(event) =>
                                        setEditText(event.target.value)
                                    }
                                    multiline
                                    rows={3}
                                    fullWidth
                                    disabled={isBusy}
                                    error={trimmedText.length > 200}
                                    helperText={`${trimmedText.length}/200 characters · Minimum 2`}
                                />

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ mt: 1.5 }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        disabled={
                                            isBusy ||
                                            trimmedText.length < 2 ||
                                            trimmedText.length > 200
                                        }
                                    >
                                        {editMutation.isPending
                                            ? "Saving..."
                                            : "Save"}
                                    </Button>

                                    <Button
                                        type="button"
                                        size="small"
                                        disabled={isBusy}
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Box>
                        ) : (
                            <>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.75,
                                        lineHeight: 1.7,
                                        whiteSpace: "pre-wrap",
                                        overflowWrap: "anywhere",
                                    }}
                                >
                                    {comment.comment}
                                </Typography>

                                {isOwn && (
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{ mt: 1 }}
                                    >
                                        <IconButton
                                            aria-label="Edit blog"
                                            onClick={
                                                handleStartEdit
                                            }
                                            sx={{
                                                fontSize:'12px',
                                                "&:hover": {
                                                    color: "primary.main",
                                                    borderColor:
                                                        "primary.main",
                                                },
                                            }}
                                        >
                                            <EditOutlinedIcon />
                                        </IconButton>

                                        <IconButton
                                            aria-label="Delete comment"
                                            onClick={
                                                handleOpenDelete
                                            }
                                            sx={{
                                                "&:hover": {
                                                    color: "error.main",
                                                    borderColor:
                                                        "error.main",
                                                    bgcolor: "#FEF2F2",
                                                },
                                            }}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Stack>
                                )}
                            </>
                        )}
                    </Box>
                </Stack>
            </Paper>

            <Dialog
                open={deleteOpen && isOwn}
                onClose={handleCloseDelete}
                fullWidth
                maxWidth="xs"
                aria-labelledby="delete-comment-title"
            >
                <DialogTitle id="delete-comment-title">
                    Delete comment?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        This comment will be permanently deleted.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleCloseDelete}
                        disabled={deleteMutation.isPending}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending
                            ? "Deleting..."
                            : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CommentItem;