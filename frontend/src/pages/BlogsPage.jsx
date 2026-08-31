import { Container, Typography } from '@mui/material'

const BlogsPage = () => {
  return (
   <Container maxWidth="lg" 
   sx={{
    py:8
   }}>
 <Typography
        component="h1"
        variant="h3"
      >
        Blogs
      </Typography>
   </Container>
  )
}

export default BlogsPage
