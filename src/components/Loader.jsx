import React from 'react'
import '../css/Loader.css'
import { Backdrop, Modal } from '@mui/material'

const Loader = ({isLoading}) => {
  return (
 
        <Backdrop open={isLoading}
         sx={{
          zIndex:100,
          display:'flex', 
          justifyContent:'center', 
          alignItems:'center', 
          pointerEvents:'none',
          MozUserSelect:'none', 
          WebkitUserSelect:'none', 
          msUserSelect:'none',
          userSelect:'none', 
          borderStyle:'none'}}>
            <div className="loader"></div>
        </Backdrop>
  )
}

export default Loader