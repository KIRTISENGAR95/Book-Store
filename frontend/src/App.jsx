import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Navbar/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

const App=()=>{
  return(
    <div>
      <Router>
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
      </Router>
    </div>
  )
};

export default App;