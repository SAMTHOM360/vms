import React from 'react'
import { Typography, Box, } from '@mui/material'



const Header = ({title, subtitle}) => {

  return (
   <Box
   sx={{overflow:'hidden'}}
   >
    <Typography variant='h4'
    color="#3d3d3d"
    fontWeight="bold"
    >
        {title}
    </Typography>
    <Typography variant='h7'
    sx={{mt: "5px"}}
    color="#666666">
        {subtitle}
        </Typography>
   </Box>
  )
}

export default Header