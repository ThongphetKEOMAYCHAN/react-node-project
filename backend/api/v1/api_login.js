const express = require('express');
const router = express.Router()
const db = require("../../db");
const bcrypt = require('bcryptjs')

router.post('/login', function (req, res) {
    const email = req.sanitize(req.body.email);
    const pass = req.sanitize(req.body.password);

    // console.log(req.body);
    if (email && pass) {
        db.query("SELECT * FROM tbl_customer where email = ?", [email], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                // console.log(result[0].password);
                let Logged = bcrypt.compareSync(pass, result[0].password);
                if (Logged) {
                    res.json({status:'success', message:"Login success"})
                } else {
                    res.json({ status: "Password Incorrect" });
                }
            } else {
                 res.json({ status: "Email Incorrect" });
            }
        })
    }
});

module.exports = router;