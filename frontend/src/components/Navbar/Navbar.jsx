import React, { useState } from "react";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () =>{
    const links = [
        {
            title:"Home",
            link:"/",
        },
        {
            title:"All Books",
            link:"/all-books",
        },
        {
            title:"Cart",
            link:"/Cart",
        },
        {
            title:"Profile",
            link:"/Profile",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if(isLoggedIn === false){
        links.splice(2,2);
    }

    const [MobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-2 item-center justify-between">
            <div className="flex items-center">
                <img
                    className="h-10 me-4"
                    src="https://i.pinimg.com/736x/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.jpg" 
                    alt="logo" 
                />
                <h1 className="text-2xl font-semibold">MyBookStore</h1>
            </div>
            <div className="nav-links-MyBookStore block md:flex items-center gap-4">
                <div className="hidden md:flex gap-4">
                    {links.map((items,i)=>(
                    <Link 
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300" 
                    key={i}
                    >
                        {items.title}{" "}
                    </Link>
                ))}
                </div>

                <div className="hidden md:flex gap-4">
                    <Link
                    to="/LogIn" 
                    className="px-4 py-1 border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 ">Login</Link>
                    <Link 
                    to="/SignUp"
                    className="px-4 py-1 bg-blue-500 rounded">SignUp</Link>
                </div>

                <button 
                    className=" block md:hidden text-white text-2xl hover:text-zinc-400" 
                    onClick={()=> (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
                    <FaGripLines/>
                </button>
            </div>
            </nav>

            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
            {links.map((items,i)=>(
                    <Link 
                    to={items.link}
                    className={` ${MobileNav} text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`} 
                    key={i}
                    onClick={()=> (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}
                    >
                        {items.title}{" "}
                    </Link>
                ))}
                  
            
                
            </div>
        </>
        
    );
};

export default Navbar;