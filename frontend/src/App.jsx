import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Navbar/Footer";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import AllBooks from "./pages/AllBooks";
// import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
const App=()=>{
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);
  return(
    <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/all-books" element={<Home/>}></Route>
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/LogIn" element={<LogIn/>}></Route>
        </Routes>
        <Footer/>
    </div>
  )
};

export default App;