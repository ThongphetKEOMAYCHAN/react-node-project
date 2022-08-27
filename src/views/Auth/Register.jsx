import React from 'react'
import { Box, Container } from '@mui/system';
import { Button,TextField, Typography } from '@mui/material';
import {Link} from 'react-router-dom'

function Register() {
     return (
          <>
               <Container maxWidth='xs' sx={{mt:3, boxShadow:'0px 0.5px 1px 1px #c6c6c6',borderRadius:'10px'}}>
                    <Box sx={{
                         display: "flex", flexDirection: "column",
                         justifyContent: 'center'
                    }}>
                         <Typography variant='h5' sx={{mt:3, mb:4}}>Form Register</Typography>
                         <TextField
                              id="outlined-basic"
                              label="username"
                              variant="outlined"
                              sx={{ mb: 2 }}
                              size="small"
                         />
                         <TextField
                              id="outlined-basic"
                              label="Email"
                              variant="outlined"
                              sx={{ mb: 2 }}
                              size="small"
                         />
                         <TextField
                              id="outlined-basic"
                              label="Password"
                              variant="outlined"
                              sx={{ mb: 2 }}
                              size="small"
                         />
                         <TextField
                              id="outlined-basic"
                              label="Phone number"
                              variant="outlined"
                              sx={{ mb: 2 }}
                              size="small"
                         />
                         <TextField
                              id="outlined-basic"
                              label="Address"
                              variant="outlined"
                              sx={{ mb: 2 }}
                              size="small"
                         />
                         <Button variant='contained' color='success' sx={{ mb: 3, mt: 3 }}>Submit</Button>
                         <Typography sx={{mb:3}}>you already register <Link to="/Login">Login</Link> </Typography>
                    </Box>
               </Container>
          </>
     );
}

export default Register