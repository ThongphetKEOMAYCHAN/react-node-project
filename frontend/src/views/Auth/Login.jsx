import React, { useState } from 'react'
import { Box, Container } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

function Login() {
     const [signIn, setSignIn] = useState({
          email: '',
          password: ''
     });

     const handleSignIn = (e) => {
          e.preventDefault();
          var qs = require("qs");
          var data = qs.stringify({
               email: signIn.email,
               password: signIn.password,
          });
          var config = {
               method: "post",
               url: "http://127.0.0.1:5000/api/v1/login",
               headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
               },
               data: data,
          };

          axios(config)
               .then(function (response) {
                    if (response.data.message) {
                         console.log(response.data);
                         localStorage.setItem("user", response.data.email);
                         localStorage.setItem(
                              "login", (response.data.token)
                         );
                    }
               })
               .catch(function (error) {
                    console.log(error);
               });
     }
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
                    onSubmit={handleSignIn}
                    >
                         <Typography variant="h5" sx={{mt:2,mb:3}}>Login Form</Typography>
                         <TextField
                              id="outlined-basic"
                              label="Email"
                              variant="outlined"
                              sx={{ mb: 2 }}
                              size="small"
                              value={signIn.email}
                              onChange={(e)=> setSignIn({...signIn, email: e.target.value})}
                         />
                         <TextField
                              id="outlined-basic"
                              label="Password"
                              type="password"
                              variant="outlined"
                              sx={{ mb: 2 }}
                              size="small"
                              value={signIn.password}
                              onChange={(e)=>setSignIn({...signIn, password: e.target.value})}
                         />
                         <Button variant="contained" type="submit" color='success' sx={{ mb: 3, mt: 3 }}>Login</Button>
                    </Box>
               </Container>
          </>
     );
}

export default Login