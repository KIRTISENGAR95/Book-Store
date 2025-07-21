import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Navbar/Footer";
import Navbar from "./components/Navbar/Navbar";
import Favourites from "./components/Profile/Favourites";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
// import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import ViewBookDetails from "../src/components/ViewBookDetails/ViewBookDetails";
import Settings from "./components/Profile/Settings";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import AddBook from "./pages/AddBook";
import AllOrders from "./pages/AllOrders";
import UpdateBook from "./pages/UpdateBook";
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
          <Route path="/profile" element={<Profile/>} >
            {role === "user" ? <Route index element={<Favourites/>}/> : <Route index element={<AllOrders/>}/>}
            {role === "admin" && <Route path="/profile/add-book" element={<AddBook/>}/>}
            <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
            <Route path="/profile/settings" element={<Settings/>}/>
          </Route>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/updateBook/:id" element={<UpdateBook/>} />
          <Route path ="view-book-details/:id" element={<ViewBookDetails/>} />
        </Routes>
        <Footer/>
    </div>
  )
};

export default App;