const express = require('express');
const router = express.Router();
const { v4: uuid4v } = require('uuid');
const moment = require('moment');
const bcrypt = require("bcryptjs");
const db = require('./../../db');

router.post('/register', function (req, res) {
    const uuid = uuid4v();
    const name = req.sanitize(req.body.name);
    const lastName = req.sanitize(req.body.lastName);
    const address = req.sanitize(req.body.address);
    const tel = req.sanitize(req.body.tel);
    const email = req.sanitize(req.body.email);
    const password = bcrypt.hashSync(req.body.password, 8);
    const dateTime = moment().format('YYYY-MM-DD');


    if (lastName && email && password) {
        db.query("select * from tbl_customer where email = ?", [email], (err, result) => {
            if (result.length > 0) {
                res.send("exist");
                console.log("Your account already used");
            } else {
                let sql = "INSERT INTO tbl_customer(uuid,name,last_name,address,tel,email,password,create_date) VALUES ?";
                let data = [[uuid, name, lastName, address, tel, email, password, dateTime]];
                db.query(sql, [data], (err, result) => {
                    if (result) {
                        res.send("inserted");
                        console.log(result);
                    } else {
                        // res.send(err);
                        res.send("error");
                    }
                });
            }
        });
    }
    else {
        res.send('data is required');
    }

})

module.exports = router;