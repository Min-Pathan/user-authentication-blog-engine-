import {
  Box,
  MenuItem,
  Pagination,
  TextField,
} from "@mui/material";

const pageSizeOptions = [
  6, 12, 24, 48
];

function PaginationCustom({
  page,
  rowCount,
  itemPerPage,
  setCurrentPage,
  setItemPerPage,
}) {
  const totalPages = Math.ceil(
    rowCount / itemPerPage,
  );

  const handlePageChange = (
    _event,
    value,
  ) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (
    event,
  ) => {
    const newPageSize =
      Number(event.target.value);

    setItemPerPage(
      newPageSize,
    );

    // whenever page size changes,
    // start again from page 1
    setCurrentPage(1);
  };

  if (rowCount === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
        flexWrap: "wrap",
      }}
    >
       <TextField
        select size="small" value={itemPerPage} onChange={handlePageSizeChange}
        sx={{
          width: 100
        }}
      >
        {pageSizeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Pagination
        count={totalPages}
        page={page}
        onChange={
          handlePageChange
        }
        color="primary"
        shape="rounded"
        variant="outlined"
        showFirstButton
        showLastButton
      />
     

    </Box>
  );
}

export default PaginationCustom;