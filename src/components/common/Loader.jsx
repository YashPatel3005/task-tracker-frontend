import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <div><Box className="loading-svg">
    <CircularProgress />
  </Box>
      
    </div>
  )
}

export default Loader
