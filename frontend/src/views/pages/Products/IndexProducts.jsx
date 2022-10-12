import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Hidden, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import AddCircle from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { fontLao } from '../../../until/fonts/font';
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
import moment from 'moment';
import axios from 'axios';


function IndexProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState('')
  const [page, setPage] = React.useState(0);
  const [dropdownProType, setDropdownProType] = useState([]);
  const [updateProducts, setUpdateProducts] = useState([])
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [proId, setProId] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const fetchData = () => {
    fetch("http://127.0.0.1:5000/api/v1/get/products", {
      method: "get",
      headers: { "x-access-token": localStorage.getItem("login") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = (row) => {
    setUpdateOpen(true);
    setUpdateProducts(row)
    console.log(row);
  }
  const updateHandleClose = () => {
    setUpdateOpen(false)
  }

  const categoryData = () => {
    fetch("http://127.0.0.1:5000/api/v1/category/data", {
      method: "get",
      headers: { "x-access-token": localStorage.getItem("login") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setDropdownProType(data);
        console.log("proType",data);
      });
  };

  useEffect(() => {
    categoryData();
  }, []);

  const updateHandle = () => {
    var qs = require("qs");
    var data = qs.stringify({
      id: updateProducts.id,
      proName: updateProducts.proName,
      price: updateProducts.price,
      proTypeId: selected,
    });
    var config = {
      method: "put",
      url: "http://127.0.0.1:5000/api/v1/update/products",
      headers: {
        "x-access-token": localStorage.getItem("login"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data === "updated") {
          console.log(response.data);
          setUpdateProducts(response.data)
          setUpdateOpen(false);
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteClose = () => {
     setDeleteOpen(false);
  }
  const openDelete = (id) => {
    setProId(id);
    setDeleteOpen(true);
  }
  const deleteHandle = () => {
    var qs = require("qs");
    var data = qs.stringify({
      proId: proId,
    });
    var config = {
      method: "delete",
      url: "http://127.0.0.1:5000/api/v1/delete/products",
      headers: {
        "x-access-token":localStorage.getItem('login'),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setDeleteOpen(false);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <Box>
        <Card>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddCircle />}
              sx={{
                borderRadius: "20px",
                width: "150px",
                height: "40px",
                fontFamily: `${fontLao}`,
              }}
              onClick={() => navigate("/addProducts")}
            >
              ເພີ່ມສິນຄ້າ
            </Button>
            <FormControl sx={{ m: 1 }} variant="standard">
              <Input
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

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
                      ສິນຄ້າ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                    >
                      ລາຄາ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                    >
                      ປະເພດສິນຄ້າ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                    >
                      ເວລາ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                    >
                      ສະຖານະ
                    </TableCell>
                  </TableRow>
                </TableHead>
                {products.length > 0 && (
                  <TableBody>
                    {products

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
                            {row.proName}
                          </TableCell>
                          <TableCell sx={{ fontFamily: `${fontLao}` }}>
                            {row.price}
                          </TableCell>
                          <TableCell sx={{ fontFamily: `${fontLao}` }}>
                            {row.category_name}
                          </TableCell>
                          <TableCell sx={{ fontFamily: `${fontLao}` }}>
                            {moment(row.dateTime).format("DD/MM/YYYY")}
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
                                  openDelete(row.id);
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
              rowsPerPageOptions={[10, 15, 20]}
              component="div"
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      </Box>
      {/* dialog update  products*/}'
      <Dialog open={updateOpen}>
        <DialogTitle sx={{ fontFamily: `${fontLao}` }}>
          ແກ້ໄຂຂໍ້ມູນສິນຄ້າ
        </DialogTitle>
        <DialogContent sx={{ overflow: "hidden" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ສິນຄ້າ"
            type="text"
            fullWidth
            InputLabelProps={{ sx: { fontFamily: `${fontLao}` } }}
            inputProps={{ sx: { fontFamily: `${fontLao}` } }}
            variant="standard"
            value={updateProducts.proName}
            onChange={(e) =>
              setUpdateProducts({ ...updateProducts, proName: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ລາຄາ"
            type="text"
            // name="price"
            fullWidth
            InputLabelProps={{ sx: { fontFamily: `${fontLao}` } }}
            inputProps={{ sx: { fontFamily: `${fontLao}` } }}
            variant="standard"
            value={updateProducts.price}
            onChange={(e) =>
              setUpdateProducts({ ...updateProducts, price: e.target.value })
            }
          />
          <FormControl
            sx={{ m: 1 }}
            size="small"
            fullWidth
            variant="standard"
            inputProps={{ sx: { fontFamily: `${fontLao}` } }}
          >
            <InputLabel
              id="demo-select-small"
              sx={{ fontFamily: `${fontLao}` }}
            >
              ປະເພດສິນຄ້າ
            </InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="ປະເພດສິນຄ້າ"
              name="category_name"
              value={selected.category_name}
              onChange={(e) => setSelected(e.target.value)}
            >
              {dropdownProType.map((row) => {
                return (
                  <MenuItem sx={{ fontFamily: `${fontLao}` }} value={row.id}>
                    {row.category_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 5 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontFamily: `${fontLao}` }}
            onClick={updateHandleClose}
          >
            ປະເສດ
          </Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ fontFamily: `${fontLao}` }}
            onClick={updateHandle}
          >
            ແກ້ໄຂ
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog delete products */}
      <Dialog open={deleteOpen}>
        <DialogTitle sx={{ fontFamily: `${fontLao}` }}>
          ເຈົ້າຕ້ອງການລືບຂໍ້ມູນສິນຄ້າແທ້ບໍ່ ?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            sx={{ fontFamily: `${fontLao}` }}
            onClick={deleteClose}
          >
            ປະຕິເສດ
          </Button>
          <Button
            variant="contained"
            type="button"
            color="success"
            sx={{ fontFamily: `${fontLao}` }}
            onClick={deleteHandle}
          >
            ລຶບ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default IndexProducts