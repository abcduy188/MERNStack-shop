import React, { useContext } from 'react'
import {Routes , Route} from 'react-router-dom';
import Product from './product/Product';
import Categories from './admin/categories/Categories';
import DetailProduct from './detailProduct/DetailProduct';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import OrderHistory from './history/OrderHistory';
import OrderDetail from './history/OrderDetail';
import NotFound from './utils/not_found/NotFound';
import CreateProduct from './admin/product/CreateProduct';
import ProductsAdmin from './admin/product/ProductsAdmin';
import UserAdmin from './admin/user/UserAdmin';
import {GlobalState} from '../../GlobalState';


function Pages() {
  const state = useContext(GlobalState);
  const [isLogged]  = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path='/' element={<Product />} />
      <Route path='/detail/:id' element={<DetailProduct />} />
      <Route path='/history/' element={isLogged ? <OrderHistory /> :NotFound() } />
      <Route path="/history/:id" element={isLogged ? <OrderDetail /> :NotFound() } />
      <Route path='/login' element={isLogged ? NotFound() : <Login/>} />
      <Route path='/register'  element={isLogged? NotFound() :<Register/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='*' element={<NotFound/>} />
      <Route path='/admin/category' element={isLogged && isAdmin ? <Categories /> :NotFound() } />
      <Route path='/admin/product' element={isLogged && isAdmin ? <ProductsAdmin /> :NotFound() } />
      <Route path='/admin/product/create' element={isLogged && isAdmin ? <CreateProduct /> :NotFound() } />
      <Route path='/admin/edit_product/:id' element={isLogged && isAdmin ? <CreateProduct /> :NotFound() } />
      <Route path='/admin/user' element={isLogged && isAdmin ? <UserAdmin /> :NotFound() } />
    </Routes> 
  )
}

export default Pages