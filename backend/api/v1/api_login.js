const express = require('express');
const router = express.Router()
const db = require("../../db");

router.post('/login', function (req, res) {
    db.query("SELECT * FROM `tbl_customer`", function (err, rs) {
        if (err) throw err

        console.log("Connect to database successfull");
        res.send("Connect to database succesfull");
    })

})

module.exports = router;