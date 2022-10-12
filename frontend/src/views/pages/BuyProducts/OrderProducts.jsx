import React, { useEffect, useState } from 'react'
import { Button, Card, FormControl, IconButton, Input, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Box } from '@mui/system';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {fontLao} from "../../../until/fonts/font" 
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom"
import AddCircle from "@mui/icons-material/AddCircleOutline";
import axios from 'axios'


function OrderProducts() {
     const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [buyData, setBuyData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = useState("");
 


     const handleChangePage = (event, newPage) => {
       setPage(newPage);
     };
     const handleChangeRowsPerPage = (event) => {
       setRowsPerPage(+event.target.value);
       setPage(0);
  }; 
  
  const fetchData = () => {
    fetch("http://127.0.0.1:5000/api/v1/fetch/buy/data", {
      method: "get",
      headers: { "x-access-token": localStorage.getItem("login") },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setBuyData(data);
        console.log(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  //  delete stories buy data
  const deleteHandle = (id) => {
    var qs = require("qs");
    var data = qs.stringify({
      id: id,
    });
    var config = {
      method: "delete",
      url: "http://127.0.0.1:5000/api/v1//delete/buy/data",
      headers: {
        "x-access-token":localStorage.getItem("login"),
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
              onClick={() => navigate("/addBuyProducts")}
            >
              ເພີ່ມການຊື້ສິນຄ້າ
            </Button>
            <FormControl sx={{ m: 1 }} variant="standard">
              <Input
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                onChange={(e)=>setSearch(e.target.value)}
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
                      ຈໍານວນ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                    >
                      ພະນັກງານ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", fontFamily: `${fontLao}` }}
                    >
                      ສະຖານະ
                    </TableCell>
                  </TableRow>
                </TableHead>
                {buyData.length > 0 && (
                  <TableBody>
                    {buyData
                      .filter((row) => {
                        if (row === "") {
                          return row;
                        } else if (row.proName.toLowerCase().includes(search.toLowerCase())) {
                          return row;
                        } else if (row.userId.toLowerCase().includes(search.toLowerCase())) {
                          return row;
                        }
                      })
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
                            {row.amount}
                          </TableCell>
                          <TableCell sx={{ fontFamily: `${fontLao}` }}>
                            {row.userId}
                          </TableCell>
                          <TableCell>
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
              count={buyData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      </Box>
    </div>
  );
}

export default OrderProducts