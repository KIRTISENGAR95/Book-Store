import React from "react";
import { Link } from "react-router-dom";


const SignUp=()=>{
    const [Values,setValues ] = useState({ 
        username:"", 
        email:"", 
        password:"", 
        address:""
    });


    return (
        <div className="h-auto bg-zinc-900 px-8 flex items-center justify-center">
            <div className="bg-zinc-800 rounded px-8 py-8 w-full md:w-3/6 lg:w-2/6">
            <p className="text-zinc-200 text-xl-400">Sign Up</p>
            <div className="mt-4">
                <div>
                    <label htmlFor="" classNAme="text-zinc-400">
                        Username
                    </label>
                    <input type="text"
                    classNAme="w-full mt-2 bg-zinc-900 text-zinc-100 py-2 outline-none"
                    placeholder="username"
                    name="username"
                    required>
                    value={Values.username}
                    onChange={change}
                    
                    </input>
                </div>
            </div>
            </div>

        </div>
    )
};

export default SignUp;