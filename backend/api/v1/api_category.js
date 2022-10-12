const express = require("express");
const router = express.Router();
const db = require("../../db");
const jwt = require("../../jwt");



router.post("/category", jwt.verify, (req, res) => {
 
     const category = req.body.proType;
     console.log(category);

     db.query("select * from category where category_name = ?", [category], (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
               res.send("exits");
          } else {
               let data = [[category]];
               let sql = "INSERT INTO `category`(`category_name`) VALUES ?";
               db.query(sql, [data], (err, result) => {
                    if (err) throw err;
                    res.send("inserted")
               })

          }
     })
});

// get category data

router.get("/category/data",(req, res) => {
     db.query("select * from category", (err, result) => {
          if (result) {
               res.send(result);
          }
     });
     
})


// update category

router.put("/update/category", jwt.verify, (req, res) => {

     const categoryId = req.body.id;
     const categoryName = req.body.name;

     let sql = "UPDATE category SET ? WHERE id = ?"
     let updateData = { "category_name": categoryName }

     db.query(sql, [updateData, categoryId], (err, result) => {
          if (err) throw err;
          res.json({ status: 'update success', message: 'update' })
     });
     
});

router.delete("/category_remove", jwt.verify, (req, res) => {
     const category_id = req.body.id;
     const sql = "DELETE FROM category WHERE id = ?";

     if (category_id) {
          db.query(sql, [category_id], (err, result) => {
               if (err) throw err;
               if (result) {
                    const sql = "DELETE FROM tbl_products WHERE categoryId = ?";
                    db.query(sql, [category_id], (err, result) => {
                         if (err) throw err;
                         res.json({ status: 'delete', message: 'deleted' });
                    })
               }
          })
     }
})

module.exports = router;