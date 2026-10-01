import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { setCredentials } from "../../features/auth/authSlice.js";
import { saveAuthData } from "../../features/auth/authStorage.js";
import { useToast } from "../../context/ToastContext.js";
import useProfile from "../../features/users/queries/useProfile.js";
import useUpdateProfile from "../../features/users/queries/useUpdateProfile.js";

function ProfilePage() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useProfile();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Profile
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
          Manage your personal information.
        </Typography>
      </Box>

      {isLoading ? (
        <Stack spacing={2}>
          <Skeleton variant="circular" width={72} height={72} />
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={56} />
        </Stack>
      ) : isError && !data ? (
        error?.response?.status === 401 ? null : (
          <Box sx={{ py: 5, textAlign: "center" }}>
            <Typography color="text.secondary">
              Could not load your profile.
            </Typography>

            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              sx={{ mt: 1 }}
            >
              {isFetching ? "Retrying..." : "Try again"}
            </Button>
          </Box>
        )
      ) : data?.user ? (
        <ProfileForm key={data.user.id} user={data.user} />
      ) : null}
    </Box>
  );
}

function ProfileForm({ user }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { token, user: authUser } = useSelector(
    (state) => state.auth,
  );

  const { mutate, isPending } = useUpdateProfile(authUser?.id);

  const [profile, setProfile] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isPending) return;

    const payload = {
      username: profile.username.trim(),
      email: profile.email.trim().toLowerCase(),
      phone: profile.phone.trim(),
    };

    mutate(
      { id: user.id, payload },
      {
        onSuccess: (response) => {
          // Avoid restoring a session that was logged out while saving.
          if (localStorage.getItem("accessToken") !== token) return;

          const credentials = {
            user: response.user,
            token,
          };

          dispatch(setCredentials(credentials));
          saveAuthData(credentials);

          setProfile({
            username: response.user.username,
            email: response.user.email,
            phone: response.user.phone || "",
          });

          showToast("Profile updated successfully", "success");
        },

        onError: (requestError) => {
          if (requestError.response?.status === 401) return;

          showToast(
            requestError.response?.data?.message ||
              "Could not save your profile. Check your details and try again.",
            "error",
          );
        },
      },
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ mb: 4 }}
      >
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: "primary.main",
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          {profile.username.charAt(0).toUpperCase()}
        </Avatar>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {profile.username}
          </Typography>

        
        </Box>
      </Stack>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            autoComplete="username"
            required
            fullWidth
            disabled={isPending}
            slotProps={{
              htmlInput: { minLength: 3, maxLength: 50 },
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            autoComplete="email"
            required
            fullWidth
            disabled={isPending}
          />

          <TextField
            label="Phone"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
            fullWidth
            disabled={isPending}
            slotProps={{
              htmlInput: { minLength: 10 },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disableElevation
            disabled={isPending}
            sx={{
              alignSelf: { xs: "stretch", sm: "flex-start" },
              px: 4,
            }}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default ProfilePage;