import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
const Cart=()=>{
    const navigate = useNavigate();
    const [cart,setCart] = useState();
    const[Total,setTotal] = useState(0);
    // Always fetch user id and token at component mount
    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const id = localStorage.getItem("id");
        const t = localStorage.getItem("token");
        setUserId(id);
        setToken(t);
    }, []);

    const headers = {
        id: userId,
        authorization: `Bearer ${token}`,
    };

    useEffect(()=>{
        const fetch = async() =>{
            const res=await axios.get(
                "http://localhost:3000/api/v1/get-user-cart",
                {headers}
            );
            setCart(res.data.data);
        };
        fetch();
    },[cart]);


    const deleteItem = async(bookid)=>{
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/remove-from-cart/${bookid}`,
                {},
                {headers }
            );
            alert(response.data.message);
        } catch (error) {
            console.error('Error removing from cart:', error);
            alert('Failed to remove item from cart.');
        }
    };

    useEffect(()=>{
        if(cart && cart.length > 0){
            let total = 0;
            cart.forEach((item)=>{
                total += item.price;
            });
            setTotal(total);
        }
    },[cart]);
    const PlaceOrder = async()=>{
        try {
            if (!userId || userId === 'undefined' || !token) {
                alert("You are not logged in. Please log in again.");
                navigate("/login");
                return;
            }
            // Construct order payload as expected by backend
            const orderPayload = cart.map(item => ({ _id: item._id }));
            const payload = { order: orderPayload };
            if (!orderPayload.length || orderPayload.some(item => !item._id)) {
                alert("Cart data is invalid. Please refresh the page.");
                return;
            }
            console.log('Placing order with payload:', payload);
            console.log('With headers:', headers);
            const response = await axios.post(
                `http://localhost:3000/api/v1/place-order`,
                payload,
                {headers}
            );
            alert(response.data.message);
            navigate("/profile/orderHistory");
        } catch (error) {
            console.error('Error placing order:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert('Backend error: ' + error.response.data.message);
                console.error('Backend response:', error.response.data);
            } else {
                alert('Failed to place order.');
            }
        }
    }


    return <div className="bg-zinc-900 px-12 h-screen py-8">
        {!cart && (
            <div className="w-full h-[100%] flex items-center justify-center">
                <Loader/>{" "}
            </div>
        )}
        {cart && cart.length === 0 && (
            <div className="h-screen">
                <div className="h-[100%] flex items-center justify-center flex-col">
                    <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                        Empty Cart

                    </h1>
                    <img
                        src="https://imgs.search.brave.com/wW0_Yr1fteafDnBjSo0ZowK-8hLAnmi-r6xKZaZxccQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/NTU4OTI0L3Bob3Rv/L2ZseWluZy1ib29r/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1Ob1lmZ1lhd1pk/aGhGdU5WV2VmMTd2/bzFqdnpDMk5rUTB6/Z2ZST0RsMGRnPQ"
                        alt="empty cart"
                        className="lg:h-[50vh]"
                    />
                </div>
            </div>
        )}
        {cart && cart.length > 0 && (
            <>
                <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
                    Your Cart
                </h1>
                {cart.map((items,i)=>(
                    <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center min-h-40 md:min-h-56"
                        key={i}
                    >
                        <div className="h-40 md:h-56 flex items-center">
                            <img
                                src={"https://m.media-amazon.com/images/I/71YTHzI9gGL._SL1360_.jpg"}
                                alt="/"
                                className="h-full w-auto object-cover rounded"
                            />
                        </div>
                        <div className="w-full md:w-auto">
                            <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                                {items.title}
                            </h1>
                            <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                                {items.desc.slice(0,100)}...
                            </p>
                            <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                                {items.desc.slice(0,65)}...
                            </p>
                            <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                                {items.desc.slice(0,100)}...
                            </p>
                            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                                    {items.price}
                                </h2>
                                <button className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                                    onClick={()=> deleteItem(items._id)}
                                >
                                    <AiFillDelete/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        )}
        {cart && cart.length > 0 && (
            <div className="mt-4 w-full flex items-center justify-end">
                <div className="p-4 bg-zinc-800 rounded">
                    <h1 className="text-3xl text-zinc-200 font-semibold">
                        Total Amount
                    </h1>
                    <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                        <h2>{cart.length} books</h2> <h2>{Total}</h2>
                    </div>
                    <div className="w-[100%] mt-3">
                        <button
                            className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                            onClick={PlaceOrder}
                        >
                            Place your order

                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
};


export default Cart;