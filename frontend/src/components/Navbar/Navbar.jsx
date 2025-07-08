import React from "react";

const Navbar = () =>{
    const links = [
        {
            title:"Home",
            link:"/",
        },
        {
            title:"About Us",
            link:"/about-us",
        },
        {
            title:"All Books",
            link:"/all-books",
        },
        {
            title:"Cart",
            link:"/cart",
        },
        {
            title:"Profile",
            link:"/profile",
        },
    ];

    return (
        <div className="flex bg-zinc-800 text-white px-8 py-2 item-center justify-between">
            <div className="flex items-center">
                <img
                    className="h-10 me-4"
                    src="https://i.pinimg.com/736x/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.jpg" 
                    alt="logo" 
                />
                <h1 className="text-2xl font-semibold">MyBookStore</h1>
            </div>
            <div className="nav-links-MyBookStore flex items-center gap-4">
                <div className="flex gap-4">
                    {links.map((items,i)=>(
                    <div className="hover:text-blue-500 transition-all duration-300" 
                    key={i}
                    >
                        {items.title}{" "}
                    </div>
                ))}
                </div>

                <div className="flex gap-4">
                    <button className="px-2 py-1 border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 ">Login</button>
                    <button className="px-2 py-1 bg-blue-500 rounded">SignUp</button>
                </div>
            </div>
        </div>
        
    );
};

export default Navbar;