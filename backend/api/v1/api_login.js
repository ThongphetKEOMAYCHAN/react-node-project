const express = require("express");
const router = express.Router();
const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("../../jwt");
const moment = require("moment");

router.post("/login", function (req, res) {
  const email = req.sanitize(req.body.email);
  const pass = req.sanitize(req.body.password);

  // console.log(req.body);
  if (email && pass) {
    db.query(
      "SELECT * FROM tbl_customer where email = ?",
      [email],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          let Logged = bcrypt.compareSync(pass, result[0].password);
          if (Logged) {
              
            var payload = {
              uuid: result[0].uuid,
              email: email,
              create_date: moment().format("YYYY-MM-DD H:m:s"),
            };

            const token = jwt.sign(payload);

            res.json({
              status: "success",
              message: "Login success",
              token: token,
              email: email,
            });
        
            
          } else {
            res.json({ status: "error", message: "Password incorrect!!" });
          }
        } else {
          res.json({
            status: "error",
            message: "Login Failed! Please try again later!!",
          })
        }
      }
    )
  }
})

module.exports = router;
