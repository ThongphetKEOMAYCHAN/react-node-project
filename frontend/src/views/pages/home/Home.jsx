import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

function Home() {

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {

    fetch("http://127.0.0.1:5000/api/v1/count/products", {
      method: "get",
      headers: {
        "x-access-token": localStorage.getItem("login"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setProducts(data[0].count);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

     return (
       <div>
         <Card
           sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
         >
           <CardContent>
             <Typography>ລາຍການສິນຄ້າ</Typography>
             <Typography>{products}</Typography>
             
           </CardContent>
           <CardActions>
             <Button variant="contained" color="info">
               More
             </Button>
           </CardActions>
         </Card>
         <Card
           sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
         >
           <Typography>title</Typography>
           <CardContent>Lorem ipsum dolor sit amet consectetur.</CardContent>
           <CardActions>
             <Button variant="contained" color="info">
               More
             </Button>
           </CardActions>
         </Card>
         <Card
           sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
         >
           <Typography>title</Typography>
           <CardContent>Lorem ipsum dolor sit amet consectetur.</CardContent>
           <CardActions>
             <Button variant="contained" color="info">
               More
             </Button>
           </CardActions>
         </Card>
       </div>
     );
}

export default Home