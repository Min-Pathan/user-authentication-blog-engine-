import { Box } from "@mui/material";
import { Outlet } from "react-router";

import Navbar from "../components/navigation/Navbar"

const MainLayout = () => {
  return (
<Box sx={{
    minHeight:'100vh',   bgcolor: "background.default",
}}>
    <Navbar/>
    <Outlet/>
</Box>
  )
}

export default MainLayout
