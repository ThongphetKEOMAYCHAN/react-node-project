const express = require("express");
const router = express.Router();
const { v4: uuid4v } = require("uuid");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const db = require("./../../db");
const multer = require("multer");
const path = require("path");

router.post("/register", function (req, res) {
  let myFileName = "";
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploaded");
    },
    filename: function (req, file, cb) {
      myFileName = uuid4v() + path.extname(file.originalname); // image122.png
      cb(null, myFileName);
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 10485760 },
  }).single("myFile");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code == "LIMIT_FILE_SIZE") {
        res.status(400).json({ message: "File is larger then 10mb" });
      }
    } else if (err) {
      res.status(400).json({ message: "Upload file is error" });
    }

    // res.json({ message: "Upload file is success" });
    const uuid = uuid4v();
    const name = req.sanitize(req.body.name);
    const lastName = req.sanitize(req.body.lastName);
    const address = req.sanitize(req.body.address);
    const tel = req.sanitize(req.body.tel);
    const email = req.sanitize(req.body.email);
    const password = bcrypt.hashSync(req.body.password, 8);
    const image = myFileName;
    const dateTime = moment().format("YYYY-MM-DD");

    if (lastName && email && password) {
      db.query(
        "select * from tbl_customer where email = ?",
        [email],
        (err, result) => {
          if (result.length > 0) {
            res.send("exist");
            console.log("Your account already used");
          } else {
            let sql =
              "INSERT INTO tbl_customer(uuid, name, last_name, address, tel, email, password, image, create_date) VALUES ?";
            let data = [
              [
                uuid,
                name,
                lastName,
                address,
                tel,
                email,
                password,
                image,
                dateTime,
              ],
            ];
            db.query(sql, [data], (err, result) => {
              if (result) {
                res.send("insert successfull");
                console.log(result);
              } else {
                // res.send(err);
                res.send("error try again!!");
              }
            });
          }
        }
      );
    } else {
      res.send("data is required");
    }
    
  });
});

module.exports = router;
