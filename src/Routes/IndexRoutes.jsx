import React from 'react'
import { Routes, Route } from 'react-router-dom';
import IndexCategory from '../views/pages/Category/IndexCategory';

function IndexRoutes() {
     return (
          <div>
               <Routes>
                    <Route path='/category' element={<IndexCategory/>} />
               </Routes>
          </div>
     );
}

export default IndexRoutes;