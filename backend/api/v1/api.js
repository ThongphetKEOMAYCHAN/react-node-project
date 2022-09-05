const express = require("express");
const router = express.Router();

const loginAPI = require('./api_login');
const registerAPI = require("./api_register");

router.use(loginAPI)
router.use(registerAPI)

module.exports = router