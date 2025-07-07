import React from "react";

const Navbar = () =>{
    return (
        <div className="flex bg-zinc-800 text-white px-8 py-2 item-center justify-between">
            <div classNmae="flex items-center">
                <img
                    classNmae="h-10 me-4"
                    src="https://i.pinimg.com/736x/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.jpg" 
                    alt="logo" />
                <h1 classNmae="text-2xl font-semibold">MyBookStore</h1>
            </div>
            <div>Links</div>
        </div>
        
    );
};

export default Navbar;