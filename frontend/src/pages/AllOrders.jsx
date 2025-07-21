import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import Loader from "../components/Loader/Loader";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
    const [AllOrders, setAllOrders] = useState();
    const [Options, setOptions] = useState(-1);
    const [Values, setValues] = useState({ status: "" });
    const [userDiv, setuserDiv] = useState("hidden");
    const [userDivData, setuserDivData] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:3000/api/v1/get-all-orders",
                { headers }
            );
            setAllOrders(response.data.data);
        };
        fetch();
    }, []);

    if (AllOrders && AllOrders.length > 0) {
        AllOrders.splice(AllOrders.length - 1, 1);
    }

  
    const change = (e) => {
        setValues({ ...Values, [e.target.name]: e.target.value });
    };
    const submitChanges = (index) => {
        
    };

    return (
        <>
            {!AllOrders && (
                <div className="h-[100%] flex items-center justify-center">
                    <Loader />
                </div>
            )}
            {AllOrders && AllOrders.length > 0 && (
                <div className="h-[100%] p-0 md:p-4 text-zinc-100">
                    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                        All Orders
                    </h1>
                    <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 font-bold">
                        <div className="w-[3%] text-center">Sr.</div>
                        <div className="w-[40%] md:w-[22%]">Books</div>
                        <div className="w-0 md:w-[45%] hidden md:block">Description</div>
                        <div className="w-[17%] md:w-[9%]">Price</div>
                        <div className="w-[30%] md:w-[16%]">Status</div>
                        <div className="w-[10%] md:w-[5%]">User</div>
                    </div>
                    {AllOrders.map((items, i) => (
                        <div key={i} className="mt-2 bg-zinc-700 w-full rounded py-2 px-4 flex gap-2 items-center">
                            <div className="w-[3%] text-center">{i + 1}</div>
                            <div className="w-[40%] md:w-[22%]">{items.book?.Title || "N/A"}</div>
                            <div className="w-0 md:w-[45%] hidden md:block">{items.book?.Description || "N/A"}</div>
                            <div className="w-[17%] md:w-[9%]">{items.book?.Price || "N/A"}</div>
                            <div className="w-[30%] md:w-[16%]">
                                <button className="hover:scale-105 transition-all duration-300" onClick={() => setOptions(i)}>
                                    {items.status === "Order placed" ? (
                                        <div className="text-yellow-500">{items.status}</div>
                                    ) : items.status === "Canceled" ? (
                                        <div className="text-red-500">{items.status}</div>
                                    ) : (
                                        <div className="text-green-500">{items.status}</div>
                                    )}
                                </button>
                                <div className={`${Options === i ? "flex" : "hidden"} items-center mt-2`}>
                                    <select name="status" className="bg-gray-800" onChange={change} value={Values.status}>
                                        {[
                                            "Order placed",
                                            "Out for delivery",
                                            "Delivered",
                                            "Canceled",
                                        ].map((statusOption, idx) => (
                                            <option value={statusOption} key={idx}>
                                                {statusOption}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="text-green-500 hover:text-pink-600 mx-2"
                                        onClick={() => {
                                            setOptions(-1);
                                            submitChanges(i);
                                        }}
                                    >
                                        <FaCheck />
                                    </button>
                                </div>
                            </div>
                            <div className="w-[10%] md:w-[5%]">
                                <button
                                    className="text-xl hover:text-orange-500"
                                    onClick={() => {
                                        setuserDiv("fixed");
                                        setuserDivData(items.user);
                                    }}
                                >
                                    <IoOpenOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {userDivData && (
                <SeeUserData
                    userDivData={userDivData}
                    userDiv={userDiv}
                    setuseDiv={setuserDiv}
                />
            )}
        </>
    );
};

export default AllOrders;
