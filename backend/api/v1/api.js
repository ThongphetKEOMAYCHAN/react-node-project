const express = require("express");
const router = express.Router();

const loginAPI = require("./api_login");
const registerAPI = require("./api_register");
const customerAPI = require("./api_customer");
const category = require("./api_category");
const products = require("./api_products");
const buyProducts = require("./api_buyProducts")


router.use(loginAPI);
router.use(registerAPI);
router.use(customerAPI);
router.use(category);
router.use(products);
router.use(buyProducts);


module.exports = router;
