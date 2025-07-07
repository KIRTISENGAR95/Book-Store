import React from "react";
import Footer from "./components/Navbar/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

const App=()=>{
  return(
    <div>
      <Home />
      <Navbar />
      <Footer/>
    </div>
  )
};

export default App;