const express = require("express");
const router = express.Router();
const db = require("../../db");
const jwt = require("../../jwt");
const moment = require("moment");


router.post('/create/sale/products', jwt.verify, (req, res) => {
     const productId = req.body.productsId;
     const arrayPro = req.sanitize(req.body.productsId);
     const user = req.body.user;
     const products = req.body.products;
     const amount = req.body.amount;
     const price = req.body.price;
     const status = req.body.status;
     const dateTime = moment().format("YYYY-MM-DD");

     if (status === '1') {
  
          const sql = "INSERT INTO tbl_saleproducts (amount,price,proId,dateTime) VALUES(?,?,?,?)";
          db.query(sql, [amount, price, productId, dateTime], (err, result) => {
               if (err) throw err;
               // console.log(result);
               res.send(result);
          })
     } else{
          for (let i = 0; i < productId.length; i++){
          const sql = "INSERT INTO tbl_saleproducts (amount,price,proId,dateTime) VALUES(?,?,?,?)";
               db.query(sql, [`${amount[i]}`, `${price[i]}`, `${productId[i]}`, dateTime], (err, result) => {
                    if (err) throw err;
                    // res.json({status:200, massage:'success'})
                    console.log("insert");
               });
          }
      
     }
})

router.get('/get/sale', jwt.verify, (req, res) => {
     db.query('SELECT s.id,amount,p.price,proName, s.dateTime FROM `tbl_saleproducts` s \n'+
     '\tINNER JOIN tbl_products p ON s.proId = p.id', (err, result) => {
          if (err) throw err;
          res.send(result);
     });

})

module.exports = router;