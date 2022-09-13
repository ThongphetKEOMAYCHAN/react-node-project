const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync(path.join(__dirname + "/../key/private.key"), "utf-8");
const publicKey = fs.readFileSync(path.join(__dirname + "/../key/public.key"), "utf-8");


module.exports = {
     sign: payload => {
          var signOption = {
               expireIn: '24h',
               algorithm: ""
          }
          return jwt.sign(payload,privateKey,signOption)
     },
     verify: (req, res, next) => {
          var token = req.headers['kk-access-token']
          if (!token) {
               return res.status(401).send({
                    auth: false,
                    message: "Your Token is provided !"
               })
          }
          verifyOptions = {
               expireIn: '24h',
               algorithm:""
          }
          jwt.verify(token, publicKey,verifyOptions, (err, result) => {
               if(err) {
                    if (err.name == "");
               }
          })
     }

}