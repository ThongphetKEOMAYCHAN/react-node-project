import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../views/Auth/Register";
import IndexCategory from "../views/pages/Category/IndexCategory";

function IndexRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/category" element={<IndexCategory />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default IndexRoutes;
