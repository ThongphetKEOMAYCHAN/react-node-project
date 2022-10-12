import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import axios from 'axios'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fontLao } from '../../../until/fonts/font';

function IndexCategory() {
  const [proType, setProType] = useState("");
  const [error, setError] = useState("");
  const [listData, setListData] = useState([]);
  const [updateId, setUpdateId] = useState('');
   const [open, setOpen] = React.useState(false);
  const onChange = (e)=>{
    setProType(e.target.value);
    }
  const handleSubmit = (e) => {

    e.preventDefault();
    var qs = require("qs");
    var data = qs.stringify({
      proType: proType,
    });
    var config = {
      method: "post",
      url: "http://127.0.0.1:5000/api/v1/category",
      headers: {
        "x-access-token": localStorage.getItem('login'),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data === "inserted") {
          console.log(response.data);
          setError("ເພີ່ມຂໍ້ມູນສໍາເລັດ"); 
          window.location.reload();
        } else if (response.data === "exits") {
          setError("ຂໍ້ມູນໃນລະບົບແລ້ວ");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
  };
  
  // get data

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/api/get_products", {
      method: "get",
      headers: { "x-access-token": localStorage.getItem("login") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setListData(data);
        console.log(data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);



 
  const handleClickOpen = (id) => {
    setOpen(true);
    setUpdateId(id);
    
  };

  const handleClose = () => {
    setOpen(false);
  };


  // update function
  const updateHandle = () => {
   
    var qs = require("qs");
    var data = qs.stringify({
      id: updateId.id,
      name: updateId.category_name,
    });
    var config = {
      method: "put",
      url: "http://127.0.0.1:5000/api/v1/update/category",
      headers: {
        "x-access-token": localStorage.getItem("login"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setOpen(false);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

// delete 
  const deleteHandle = (id) => {
    console.log(id);
    var qs = require("qs");
    var data = qs.stringify({
      id: id,
    });
    var config = {
      method: "delete",
      url: "http://127.0.0.1:5000/api/v1/category_remove",
      headers: {
        "x-access-token": localStorage.getItem("login"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

     const Item = styled(Paper)(({ theme }) => ({
       backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
       ...theme.typography.body2,
       padding: theme.spacing(1),
       textAlign: "center",
       color: theme.palette.text.secondary,
     }));


     return (
       <div>
         <Box display="flex">
           <Box
             sx={{
               borderRadius: "10px",
               mt: 5,
               padding: "100px 10px 10px 10px",
               mb: 3,
               width: "30%",
               border: "1px solid grey",
             }}
             component="form"
             onSubmit={handleSubmit}
           >
             <TextField
               variant="outlined"
               size="small"
               fullWidth
               label="ປະເພດ"
               value={proType}
               onChange={onChange}
               InputLabelProps={{ sx: { fontFamily: `${fontLao}` } }}
             />
             {error && (
               <Typography sx={{ mt: 2, fontFamily: `${fontLao}` }}>
                 {error}
               </Typography>
             )}
             <Button
               type="submit"
               variant="contained"
               color="success"
               sx={{ mt: 5, fontFamily: `${fontLao}` }}
             >
               ເພີ່ມປະເພດ
             </Button>
           </Box>
           <Box sx={{ ml: 5 }}>
             <Paper sx={{ width: "100%", overflow: "hidden" }}>
               <TableContainer sx={{ maxHeight: 440 }}>
                 <Table stickyHeader aria-label="sticky table">
                   <TableHead>
                     <TableRow>
                       <TableCell
                         className="link"
                         sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                       >
                         ລໍາດັບ
                       </TableCell>
                       <TableCell
                         sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                       >
                         ປະເພດ
                       </TableCell>
                       <TableCell
                         sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                       >
                         ສະຖານະ
                       </TableCell>
                     </TableRow>
                   </TableHead>
                   {listData.length > 0 && (
                     <TableBody>
                       {listData
                         .slice(
                           page * rowsPerPage,
                           page * rowsPerPage + rowsPerPage
                         )
                         .map((row) => (
                           <TableRow>
                             <TableCell sx={{ fontFamily: `${fontLao}` }}>
                               {row.id}
                             </TableCell>
                             <TableCell sx={{ fontFamily: `${fontLao}` }}>
                               {row.category_name}
                             </TableCell>
                             <TableCell>
                               <IconButton>
                                 <EditIcon
                                   color="success"
                                   onClick={() => {
                                     handleClickOpen(row);
                                   }}
                                 />
                               </IconButton>
                               <IconButton>
                                 <DeleteIcon
                                   color="secondary"
                                   onClick={() => {
                                     deleteHandle(row.id);
                                   }}
                                 />
                               </IconButton>
                             </TableCell>
                           </TableRow>
                         ))}
                     </TableBody>
                   )}
                 </Table>
               </TableContainer>
               <TablePagination
                 rowsPerPageOptions={[5, 10, 20]}
                 component="div"
                 count={listData.length}
                 rowsPerPage={rowsPerPage}
                 page={page}
                 onPageChange={handleChangePage}
                 onRowsPerPageChange={handleChangeRowsPerPage}
               />
             </Paper>
           </Box>
         </Box>

         {/* popup update */}
         <Dialog
           open={open}
           onClose={handleClose}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
         >
           <DialogTitle id="alert-dialog-title">
             ແກ້ໄຂຂໍ້ມູນປະເພດສິນຄ້າ
           </DialogTitle>
           <DialogContent>
             <DialogContentText id="alert-dialog-description">
               <TextField
                 variant="outlined"
                 size="small"
                 fullWidth
                 name="category_name"
                 label="ປະເພດ"
                 value={updateId.category_name}
                 onChange={(e) =>
                   setUpdateId({ ...updateId, category_name: e.target.value })
                 }
               />
             </DialogContentText>
           </DialogContent>
           <DialogActions sx={{ mb: 3 }}>
             <Button onClick={updateHandle} variant="contained" color="success">
               ແກ້ໄຂ
             </Button>
             <Button
               onClick={handleClose}
               variant="contained"
               autoFocus
               color="secondary"
             >
               ປະຕິເສດ
             </Button>
           </DialogActions>
         </Dialog>
       </div>
     );
}

export default IndexCategory;