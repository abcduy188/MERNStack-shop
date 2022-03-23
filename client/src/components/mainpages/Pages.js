import React, { useContext } from 'react'
import {Routes , Route} from 'react-router-dom';
import Product from './product/Product';
import AdminProduct from './admin/product';
import DetailProduct from './detailProduct/DetailProduct';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import OrderHistory from './history/OrderHistory';
import OrderDetail from './history/OrderDetail';
import NotFound from './utils/not_found/NotFound';

import {GlobalState} from '../../GlobalState';


function Pages() {
  const state = useContext(GlobalState);
  const [isLogged]  = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path='/admin/product' element={isLogged && isAdmin ? <AdminProduct /> :NotFound() } />
      <Route path='/' element={<Product />} />
      <Route path='/detail/:id' element={<DetailProduct />} />
      <Route path='/history/' element={isLogged ? <OrderHistory /> :NotFound() } />
      <Route path="/history/:id" element={isLogged ? <OrderDetail /> :NotFound() } />
      <Route path='/login' element={isLogged ? NotFound() : <Login/>} />
      <Route path='/register'  element={isLogged? NotFound() :<Register/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes> 
  )
}

export default Pages