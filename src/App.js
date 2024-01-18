
// import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Component/Home/Home"
import AdminLogin from "./Component/AdminUser/AdminLogin"
import Cart from "./Component/Cart/Cart"
import Login from "./Component/User/Login"
import SignUP from './Component/User/SignUP';
import AdminSignUp from './Component/AdminUser/AdminSignUp';
import { useEffect, useState } from 'react';
import AddProduct from './Component/Product/AddProduct';
import ProductDetail from './Component/ProductDetail/ProductDetail';

function App() {
  const [checkadmin,setCheckadmin]=useState()
  const [checkuser,setCheckuser]=useState()
  const checkAdminuser=()=>{
    const adminData=localStorage.getItem("adminuser")
    const adminuser=JSON.parse(adminData)
    setCheckadmin(adminuser)
  }
  const checkuserlog=()=>{
    const userData=localStorage.getItem("user")
    const user=JSON.parse(userData)
    setCheckuser(user)
  }
  useEffect(()=>{
    checkAdminuser()
    checkuserlog()
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar checkadmin={checkadmin}  checkAdminuser={checkAdminuser} checkuser={checkuser} checkuserlog={checkuserlog} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/adminlogin' element={<AdminLogin checkAdminuser={checkAdminuser} />}/>
          <Route path='/adminsignup' element={<AdminSignUp />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/signup' element={<SignUP />} />
          <Route path='/login' element={<Login checkuserlog={checkuserlog}/>} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
