import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fontLao } from "../../../until/fonts/font";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircle from "@mui/icons-material/AddCircleOutline";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
function AddSaleProducts() {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [addSale, setAddSale] = useState([]);
  const [proId, setProId] = useState("");
  const [listSaleData, setListSaleData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const saveHandle = () => {};
  // add to local
  const addSaleProducts = (e) => {
       e.preventDefault();
       console.log(proId.id);
       console.log(price);
       console.log(amount);
          console.log(listSaleData);
          let addSaleData = JSON.parse(localStorage.getItem("SaleDetail") || "[]");
     console.log(products);
    let SaleProducts = {
      productsId: proId.id,
      products: proId.proName,
      price: price,
      amount: amount,
    };

    if (proId.id !== "") {
      listSaleData.push(SaleProducts);
      localStorage.setItem("SaleDetail", JSON.stringify(addSaleData));
     //  window.location.reload();
    }
  };
  // get data from localStorage
  const getLocal = () => {
    let getProducts = JSON.parse(localStorage.getItem("SaleDetail"));
    if (getProducts) {
      setListSaleData(getProducts);
    }
  };
  useEffect(() => {
    getLocal();
  }, []);
  return (
    <div>
      <Container>
        <Box>
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
              ສິນຄ້າ
            </InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="ສິນຄ້າ"
              name="products"
              value={proId}
              onChange={(e) => setProId(e.target.value)}
            >
              {products.map((row) => {
                return (
                  <MenuItem sx={{ fontFamily: `${fontLao}` }} value={row}>
                    {row.proName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            size="small"
            autoFocus
            margin="dense"
            id="name"
            label="ຈໍານວນ"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            size="small"
            autoFocus
            margin="dense"
            id="name"
            label="ລາຄາ"
            type="number"
            fullWidth
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Box
            sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "flex-end" }}
          >
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
              type="submit"
              onClick={addSaleProducts}
            >
              ເພີ່ມສິນຄ້າຂາຍ
            </Button>
          </Box>
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
                    ຈໍານວນ
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                  >
                    ລາຄາ
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                  >
                    ສະຖານະ
                  </TableCell>
                </TableRow>
              </TableHead>
              {listSaleData.length > 0 && (
                <TableBody>
                  {listSaleData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow>
                        <TableCell sx={{ fontFamily: `${fontLao}` }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontFamily: `${fontLao}` }}>
                          {row.products}
                        </TableCell>
                        <TableCell sx={{ fontFamily: `${fontLao}` }}>
                          {row.amount}
                        </TableCell>
                        <TableCell sx={{ fontFamily: `${fontLao}` }}>
                          {row.price}
                        </TableCell>
                        <TableCell>
                          <IconButton>
                            <DeleteIcon
                              color="secondary"
                              // onClick={() => {
                              //   deleteHandle(row.products);
                              // }}
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
            count={listSaleData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Button
          variant="contained"
          color="success"
          sx={{
            mt: 3,
            mb: 3,
            borderRadius: "20px",
            width: "150px",
            height: "40px",
            fontFamily: `${fontLao}`,
          }}
          onClick={saveHandle}
        >
          ບັນທຶກຂໍ້ມູນ
        </Button>
      </Container>
    </div>
  );
}

export default AddSaleProducts