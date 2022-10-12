import React, { useEffect, useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import { fontLao } from '../../../unitls/fonts/font';

function AddProducts() {
  const [category, setCategory] = useState([])
  const [selected, setSelected] = useState('');
  const [error, setError] = useState("");
  const [addProducts, setAddProducts] = useState({
    proName: '',
    price: '',
  })
  const fetchData = () => {
    fetch("http://127.0.0.1:5000/api/v1/category/data", {
      method: "get",
      headers: { "x-access-token": localStorage.getItem("login") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCategory(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleAddProducts = (e) => {
    e.preventDefault();
    var qs = require("qs");
    var data = qs.stringify({
      proName: addProducts.proName,
      price: addProducts.price,
      proTypeId: selected,
    });
    var config = {
      method: "post",
      url: "http://127.0.0.1:5000/api/v1/create/products",
      headers: {
        "x-access-token":localStorage.getItem("login"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("data",response.data);
        setAddProducts(response.data);
        setError("ເພີ່ມສິນຄ້າສໍາເລັດ");
      })
      .catch(function (error) {
        console.log(error);
      });
  }


     return (
       <div>
         <Box sx={{ display: "flex", justifyContent: "center" }}>
           <Grid
             md={8}
             sm={12}
             sx={{ border: "1px solid grey", borderRadius: "10PX", p: 5 }}
             component="form"
             onSubmit={handleAddProducts}
           >
             <Typography sx={{ mt: 3, mb: 3, fontFamily: `${fontLao}` }}>
               ເພີ່ມຂໍ້ມູນສິນຄ້າ
             </Typography>
             <TextField
               sx={{ mb: 2 }}
               fullWidth
               variant="outlined"
               label="ສິນຄ້າ"
               size="small"
               InputLabelProps={{ sx: { fontFamily: `${fontLao}` } }}
               inputProps={{ sx: { fontFamily: `${fontLao}` } }}
               value={addProducts.proName}
               onChange={(e) =>
                 setAddProducts({ ...addProducts, proName: e.target.value })
               }
             />
             <TextField
               sx={{ mb: 2 }}
               fullWidth
               variant="outlined"
               label="ລາຄາ"
               type="number"
               size="small"
               InputLabelProps={{ sx: { fontFamily: `${fontLao}` } }}
               inputProps={{ sx: { fontFamily: `${fontLao}` } }}
               value={addProducts.price}
               onChange={(e) =>
                 setAddProducts({ ...addProducts, price: e.target.value })
               }
             />

             <FormControl
               sx={{ m: 1 }}
               size="small"
               fullWidth
               inputProps={{ sx: { fontFamily: `${fontLao}` } }}
             >
               <InputLabel
                 fullWidth
                 id="demo-select-small"
                 sx={{ fontFamily: `${fontLao}` }}
               >
                 ປະເພດສິນຄ້າ
               </InputLabel>
               <Select
                 sx={{textAlign:'left'}}
                 labelId="demo-select-small"
                 id="demo-select-small"
                 label="ປະເພດສິນຄ້າ"
                 name="category_name"
                 value={selected.category_name}
                 onChange={(e) => setSelected(e.target.value)}
               >
                 {category.map((row) => {
                   return (
                     <MenuItem sx={{ fontFamily: `${fontLao}` }} value={row.id}>
                       {row.category_name}
                     </MenuItem>
                   );
                 })}
               </Select>
             </FormControl>

             {error && (<Typography sx={{fontFamily:`${fontLao}`, color:'red'}}>{error }</Typography>)}
             <Button type="submit"
               variant="contained"
               color="success"
               sx={{
                 display: "flex",
                 mt: 2,
                 justifyContent: "center",
                 fontFamily: `${fontLao}`,
               }}
             >
               ເພີ່ມສິນຄ້າ
             </Button>
           </Grid>
         </Box>
       </div>
     );
}

export default AddProducts