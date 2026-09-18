import {
  Box,
  Skeleton,
  Stack,
} from "@mui/material";

function BlogDetailsSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="rounded"
        width={100}
        height={28}
        sx={{ mb: 3 }}
      />

      <Skeleton
        variant="text"
        width="90%"
        height={60}
      />

      <Skeleton
        variant="text"
        width="65%"
        height={60}
        sx={{ mb: 2 }}
      />

      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Skeleton
          variant="circular"
          width={36}
          height={36}
        />

        <Box>
          <Skeleton
            width={100}
          />

          <Skeleton
            width={140}
          />
        </Box>
      </Stack>

      <Skeleton
        variant="rectangular"
        width="100%"
        height={420}
        sx={{
          borderRadius: 3,
          mb: 4,
        }}
      />

      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton width="85%" />
      <Skeleton />
      <Skeleton width="70%" />
    </Box>
  );
}

export default BlogDetailsSkeleton;