import { useEffect, useState } from "react";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../../features/blogs/validation/blogSchema";


const categories = [
  "React",
  "JavaScript",
  "Node.js",
  "Career",
  "Design",
];

const emptyValues = {
  title: "",
  content: "",
  category: "",
  media: null,
};

function BlogForm({
  defaultValues = emptyValues,
  existingMedia = null,
  submitLabel = "Save Blog",
  onSubmit,
  submitting = false,
}) {
  const [newMediaPreview, setNewMediaPreview] =
    useState(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(blogSchema),

    defaultValues: {
      ...emptyValues,
      ...defaultValues,
      media: null,
    },
  });

  /*
   * Important for Edit page.
   *
   * Later the blog may arrive asynchronously from an API.
   * reset() allows React Hook Form to receive those values.
   */
  useEffect(() => {
    reset({
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
      category: defaultValues?.category ?? "",
      media: null,
    });

    // setNewMediaPreview(null);
  }, [
    defaultValues?.title,
    defaultValues?.content,
    defaultValues?.category,
    reset,
  ]);

  /*
   * Revoke temporary browser URL when preview changes
   * or component unmounts.
   */
  useEffect(() => {
    return () => {
      if (newMediaPreview?.url) {
        URL.revokeObjectURL(
          newMediaPreview.url,
        );
      }
    };
  }, [newMediaPreview]);

  const handleMediaChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const isImage =
      file.type.startsWith("image/");

    const isVideo =
      file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setError("media", {
        type: "manual",
        message:
          "Only image or video files are allowed",
      });

      return;
    }

    clearErrors("media");

    setValue("media", file, {
      shouldDirty: true,
    });

    setNewMediaPreview({
      url: URL.createObjectURL(file),

      type: isVideo
        ? "video"
        : "image",
    });

    /*
     * Allows selecting the same file again later.
     */
    event.target.value = "";
  };

  const handleRemoveNewMedia = () => {
    setValue("media", null, {
      shouldDirty: true,
    });

    setNewMediaPreview(null);
  };

  const preview =
    newMediaPreview || existingMedia;

  const submitForm = async (data) => {
    await onSubmit(data);
  };

  const loading =
    isSubmitting || submitting;

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(submitForm)}
    >
      <Stack spacing={3}>
        {/* Main fields */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 4,
            },

            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Blog Details
          </Typography>

          <Stack spacing={3}>
            {/* Title */}
            <TextField
              label="Blog title"
              placeholder="Enter a clear and engaging title"
              fullWidth
              error={Boolean(errors.title)}
              helperText={
                errors.title?.message
              }
              {...register("title")}
            />

            {/* Category */}
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={categories}
                  value={field.value || null}
                  onChange={(_, newValue) => {
                    field.onChange(newValue || "");
                  }}
                  onBlur={field.onBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      placeholder="Select category"
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message} />
                  )}
                />
              )}
            />

            {/* Content */}
            <TextField
              label="Content"
              placeholder="Write your story..."
              multiline
              rows={12}
              fullWidth
              error={Boolean(
                errors.content,
              )}
              helperText={
                errors.content?.message
              }
              {...register("content")}
            />
          </Stack>
        </Paper>

        {/* Media */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 4,
            },

            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Cover Media
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.75,
              mb: 3,
            }}
          >
            Upload an image or video for
            your blog.
          </Typography>

          {/* Preview */}
          {preview && (
            <Box
              sx={{
                mb: 3,
                overflow: "hidden",
                borderRadius: 3,
                bgcolor: "#F1F5F9",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {preview.type ===
                "video" ? (
                <Box
                  component="video"
                  src={preview.url}
                  controls
                  sx={{
                    display: "block",
                    width: "100%",
                    maxHeight: 420,
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src={preview.url}
                  alt="Blog media preview"
                  sx={{
                    display: "block",
                    width: "100%",
                    height: {
                      xs: 220,
                      md: 450,
                    },
                    // objectFit: "cover",
                  }}
                />
              )}
            </Box>
          )}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.5}
            alignItems={{
              xs: "stretch",
              sm: "center",
            }}
          >
            <Button
              component="label"
              variant="outlined"
              startIcon={
                <CloudUploadOutlinedIcon />
              }
            >
              {preview
                ? "Replace media"
                : "Choose media"}

              <input
                hidden
                type="file"
                accept="image/*,video/*"
                onChange={
                  handleMediaChange
                }
              />
            </Button>

            {newMediaPreview && (
              <Button
                type="button"
                color="error"
                startIcon={
                  <DeleteOutlineIcon />
                }
                onClick={
                  handleRemoveNewMedia
                }
              >
                Remove new media
              </Button>
            )}
          </Stack>

          {errors.media && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                display: "block",
                mt: 1,
              }}
            >
              {errors.media.message}
            </Typography>
          )}
        </Paper>

        {/* Action */}
        <Stack
          direction="row"
          justifyContent="flex-end"
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            disableElevation
            disabled={loading}
            sx={{
              minWidth: 150,
            }}
          >
            {loading
              ? "Saving..."
              : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default BlogForm;