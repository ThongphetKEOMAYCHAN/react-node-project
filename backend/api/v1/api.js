const express = require("express");
const router = express.Router();

const loginAPI = require("./api_login");
const registerAPI = require("./api_register");
const customerAPI = require("./api_customer");

router.use(loginAPI);
router.use(registerAPI);
router.use(customerAPI);

module.exports = router;
