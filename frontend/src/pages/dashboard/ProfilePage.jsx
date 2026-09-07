import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Minaz",
    email: "minaz@example.com",
    phone: "+91 98765 43210",
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

    console.log("Updated profile:", profile);
  };

  return (
    <Box
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          Profile
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 0.75 }}
        >
          Manage your personal information.
        </Typography>
      </Box>

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
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
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
            {profile.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              {profile.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Writer
            </Typography>
          </Box>
        </Stack>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2.5}>
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{
                alignSelf: {
                  xs: "stretch",
                  sm: "flex-start",
                },
                px: 4,
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProfilePage;