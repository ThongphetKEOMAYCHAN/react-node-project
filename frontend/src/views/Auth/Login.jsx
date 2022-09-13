import React from 'react'
import { Box, Container } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material';

function Login() {
     return (
          <>
               <Container
                    maxWidth="xs"
                    sx={{
                         mt: 5,
                         boxShadow: "0px 0.5px 1px 1px #c6c6c6",
                         borderRadius: "10px",
                    }}
               >
                    <Box
                         sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                         }}
                         component="form"
                    // onSubmit={handleSignUp}
                    >
                         <Typography variant="h5" sx={{mt:2,mb:3}}>Login Form</Typography>
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
                              type="password"
                              variant="outlined"
                              sx={{ mb: 2 }}
                              size="small"
                         />
                         <Button variant="contained" type="submit" color='success' sx={{ mb: 3, mt: 3 }}>Login</Button>
                    </Box>
               </Container>
          </>
     );
}

export default Login