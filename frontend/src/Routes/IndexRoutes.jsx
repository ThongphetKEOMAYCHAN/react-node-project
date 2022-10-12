import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import IndexCategory from "../views/pages/Category/IndexCategory";
import AddProducts from "../views/pages/Products/AddProducts";
import IndexProducts from "../views/pages/Products/IndexProducts";
import Order_products from "../views/pages/BuyProducts/OrderProducts";
import Sale_products from "../views/pages/SaleProducts/SaleProducts";
import AddBuyProducts from "../views/pages/BuyProducts/AddBuyProducts";
import AddSaleProducts from "../views/pages/SaleProducts/AddSaleProducts";


function IndexRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/category" element={<IndexCategory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<IndexProducts />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/order_products" element={<Order_products />} />
        <Route path="/sale_products" element={<Sale_products />} />
        <Route path="/addBuyProducts" element={<AddBuyProducts />} />
        <Route path="/add_sale_products" element={<AddSaleProducts />} />
      </Routes>
    </div>
  );
}

export default IndexRoutes;
