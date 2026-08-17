import {
  Box,
} from "@mui/material";
import Navbar from "./components/navigation/Navbar";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Navbar/>
    </Box>
  );
}

export default App;