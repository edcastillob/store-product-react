import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import AddProduct from './components/Product/AddProduct';
import AddStore from './components/Store/AddStore';
import RegisterUser from './components/User/RegisterUser';
import Login from './components/User/Login';
import Navbar from './components/Navbar/Navbar';
import AllProducts from './components/Product/AllProducts';
import AllStores from './components/Store/AllStores';
import ProductDetail from './components/Product/ProductDetail';
import StoreDetail from './components/Store/StoreDetail';
import AssociateProductsStores from './components/ProductStore/ProductStore';

const RoutesComponent = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const renderNavbar = !isHomePage ? <Navbar /> : null;

  return (
    <>
      {renderNavbar}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<AddProduct />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/store" element={<AddStore />} />
        <Route path="/store/:storeId" element={<StoreDetail />} />
        <Route path="/stores" element={<AllStores />} />
        <Route path="/register" element={<RegisterUser />} />       
        <Route path="/login" element={<Login />} />
        <Route path="/associateProductToStore" element={<AssociateProductsStores />} />
      </Routes>
    </>
  );
};

export default RoutesComponent;

