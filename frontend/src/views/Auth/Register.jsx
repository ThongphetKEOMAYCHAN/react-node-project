import React, { useState } from 'react'
import { Box, Container } from '@mui/system';
import { Button,TextField, Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import axios from 'axios';

function Register() {

     const [signUp, setSignUp] = useState({
          name: '',
          lastName: '',
          address: '',
          phone:'',
          email: '',
          password: '',
          
     })
     const handleSignUp = (e) => {
          e.preventDefault();
          console.log("data", signUp);
          var qs = require("qs");
          var data = qs.stringify({
            name: signUp.name,
            lastName: signUp.lastName,
            address: signUp.address,
            tel: signUp.phone,
            email: signUp.email,
            password: signUp.password,
          });
          var config = {
               method: "post",
               url: "http://127.0.0.1:5000/api/v1/register",
               headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
               },
               data: data,
          };
          if (signUp.lastName || signUp.phone || signUp.email !=="") {
               axios(config)
                    .then(function (response) {
                         if (response.data === "inserted") {
                           console.log("insert success");
                           console.log(response.data);
                         } else if (response.data === "exist") {
                           console.log("your account already used !");    
                      }
                 })
                 .catch(function (error) {
                   console.log(error);
                 });
          } else {
               console.log("data is required");
          }
     }
     return (
       <>
         <Container
           maxWidth="xs"
           sx={{
             mt: 3,
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
             onSubmit={handleSignUp}
           >
             <Typography variant="h5" sx={{ mt: 3, mb: 4 }}>
               Form Register
             </Typography>
             <TextField
               id="outlined-basic"
               label="name"
               variant="outlined"
               sx={{ mb: 2 }}
               size="small"
               name="name"
               value={signUp.name}
               onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
             />
             <TextField
               id="outlined-basic"
               label="last name"
               variant="outlined"
               sx={{ mb: 2 }}
               size="small"
               name="lastName"
               value={signUp.lastName}
               onChange={(e) =>
                 setSignUp({ ...signUp, lastName: e.target.value })
               }
             />
             <TextField
               id="outlined-basic"
               label="address"
               variant="outlined"
               sx={{ mb: 2 }}
               size="small"
               name="address"
               value={signUp.address}
               onChange={(e) =>
                 setSignUp({ ...signUp, address: e.target.value })
               }
             />
             <TextField
               id="outlined-basic"
               label="Phone number"
               variant="outlined"
               sx={{ mb: 2 }}
               size="small"
               value={signUp.phone}
               onChange={(e) => setSignUp({ ...signUp, phone: e.target.value })}
             />
             <TextField
               id="outlined-basic"
               label="email"
               variant="outlined"
               sx={{ mb: 2 }}
               size="small"
               value={signUp.email}
               onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
             />
             <TextField
               id="outlined-basic"
               label="password"
               variant="outlined"
               type='password'
               sx={{ mb: 2 }}
               size="small"
               value={signUp.password}
               onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
             />
             <Button type='submit' variant="contained" color="success" sx={{ mb: 3, mt: 3 }}>
               Submit
             </Button>
             <Typography sx={{ mb: 3 }}>
               you already register <Link to="/Login">Login</Link>
             </Typography>
           </Box>
         </Container>
       </>
     );
}

export default Register