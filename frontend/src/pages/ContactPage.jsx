import { zodResolver } from "@hookform/resolvers/zod";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../context/ToastContext";
import useSendContact from "../features/contact/queries/useSendContact";

const contactSchema = z.object({
  name: z.string().trim()
    .min(2, "Name must contain at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),

  email: z.string().trim()
    .email("Enter a valid email address")
    .max(254, "Email is too long")
    .toLowerCase(),

  subject: z.string().trim()
    .min(3, "Subject must contain at least 3 characters")
    .max(150, "Subject cannot exceed 150 characters")
    .regex(/^[^\r\n]*$/, "Subject must be a single line"),

  message: z.string().trim()
    .min(10, "Message must contain at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
});

function ContactPage() {
  const { showToast } = useToast();
  const { mutate, isPending } = useSendContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values) => {
    if (isPending) return;

    mutate(values, {
      onSuccess: (response) => {
        showToast(response.message, "success");
        reset();
      },
      onError: (error) => {
        showToast(
          error?.response?.data?.message ||
          "Could not send your message. Please try again.",
          "error",
        );
      },
    });
  };

  return (
    <Box
      component="main"
      sx={{
        py: {
          xs: 6,
          md: 9,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "0.8fr 1.2fr",
            },

            gap: {
              xs: 5,
              md: 8,
            },

            alignItems: "start",
          }}
        >
          {/* Left Side */}
          <Box>
            <Typography
              color="primary.main"
              sx={{
                fontWeight: 700,
              }}
            >
              CONTACT
            </Typography>

            <Typography
              component="h1"
              sx={{
                mt: 2,

                fontSize: {
                  xs: "2.5rem",
                  md: "3.5rem",
                },

                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Let's start a conversation.
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 2.5,
                maxWidth: 500,
                lineHeight: 1.8,
              }}
            >
              Have a question, suggestion, or feedback about Blogger? Send us
              a message and we'll be happy to hear from you.
            </Typography>

            <Stack
              spacing={3}
              sx={{
                mt: 5,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "#EFF6FF",
                    color: "primary.main",
                  }}
                >
                  <EmailOutlinedIcon />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Email
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    minaz@blogger.com
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "#EFF6FF",
                    color: "primary.main",
                  }}
                >
                  <ForumOutlinedIcon />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Community
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Join the conversation
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* Contact Form */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },

              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Send a message
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={2.5}>
                <TextField
                  label="Name"
                  {...register("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  autoComplete="name"
                  disabled={isPending}
                  required
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  {...register("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  autoComplete="email"
                  disabled={isPending}
                  required
                  fullWidth
                />

                <TextField
                  label="Subject"
                  {...register("subject")}
                  error={Boolean(errors.subject)}
                  helperText={errors.subject?.message}
                  disabled={isPending}
                  required
                  fullWidth
                />

                <TextField
                  label="Message"
                  {...register("message")}
                  error={Boolean(errors.message)}
                  helperText={errors.message?.message}
                  multiline
                  rows={6}
                  disabled={isPending}
                  required
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disableElevation
                  disabled={isPending}
                  sx={{
                    alignSelf: {
                      xs: "stretch",
                      sm: "flex-start",
                    },
                    px: 4,
                  }}
                >
                  {isPending ? "Sending..." : "Send message"}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactPage;