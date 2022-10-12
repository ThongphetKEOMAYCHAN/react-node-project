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


function AddBuyProducts() {
  const [addNewProduct, setAddNewProduct] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState('');
  const [proId, setProId] = useState('');
  const [price, setPrice] = useState("");
  const [listBuyData, setListBuyData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addBuyData = () => {
    let listBuyData = JSON.parse(localStorage.getItem("buyDetail") || "[]");
    let buyProducts = {
      productsId: proId.id,
      products: proId.proName,
      price: price,
      amount: amount,
    };

    if (proId.id !== "") {
      listBuyData.push(buyProducts);
      localStorage.setItem("buyDetail", JSON.stringify(listBuyData));
      window.location.reload();
    }
  };

  // get data from localStorage
  const getLocal = () => {
    let getProducts = JSON.parse(localStorage.getItem("buyDetail"));
    if (getProducts) {
      setListBuyData(getProducts);
    }
  }
  useEffect(() => {
    getLocal();
  }, []);

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
        console.log("buy", data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  
// delete data localStorage
  const deleteHandle = (products) => {
    const filteredProducts = listBuyData.filter((element, index) => {
      return element.products !== products;
    });

    return (
      localStorage.setItem("buyDetail", JSON.stringify(filteredProducts)),
      setListBuyData(filteredProducts)
    );
  }
// console.log("produ",addBuyData);
  const saveHandle = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-access-token", `${localStorage.getItem("login")}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    const user = localStorage.getItem('user');
    console.log(user);
    urlencoded.append("user", user)
    if (listBuyData.length === 1) {
      console.log("1");

      urlencoded.append("productsId", listBuyData[0].productsId);
      urlencoded.append("products", listBuyData[0].products);
      urlencoded.append("amount", listBuyData[0].amount);
      urlencoded.append("price", listBuyData[0].price);
      urlencoded.append("status", '1');

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      };
      fetch("http://127.0.0.1:5000/api/v1/create/buy/products", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          console.log("result");
        })
        .catch((err) => {
        console.log(err);
      })

      localStorage.removeItem("buyDetail")
window.location.reload();
    } else if (listBuyData.length > 1) {
      console.log("many data");
      for (let i = 0; i < listBuyData.length; i++){
        urlencoded.append("productsId", listBuyData[i].productsId);
        urlencoded.append("products", listBuyData[i].products);
        urlencoded.append("amount", listBuyData[i].amount);
        urlencoded.append("price", listBuyData[i].price);
      }
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      fetch("http://127.0.0.1:5000/api/v1/create/buy/products", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          console.log("result");
        })
        .catch((err) => {
          console.log(err);
        });
      localStorage.removeItem("buyDetail");
      window.location.reload();
    } else {
      console.log("data required");
    }
  }
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
              name="category_name"
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
            label="ລາຄາ"
            type="number"
            fullWidth
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            size='small'
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
              onClick={addBuyData}
            >
              ເພີ່ມການຊື້ສິນຄ້າ
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
              {listBuyData.length > 0 && (
                <TableBody>
                  {listBuyData
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
                                  onClick={() => {
                                    deleteHandle(row.products);
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
            count={addNewProduct.length}
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
            mt:3,mb:3,
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

export default AddBuyProducts