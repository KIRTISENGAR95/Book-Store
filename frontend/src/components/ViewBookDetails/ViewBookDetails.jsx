import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [Profile, setProfile] = useState();

    useEffect(() => {
        const fetch = async () => {
            if (id === "manual-added-1") {
                setData({
                    title: "Once We WERE Together",
                    author: "Vandana",
                    price: 59,
                    desc: "She Can't Be Her is a novel by Vandana, published by BookLeaf Publishing. The story follows Ethan, who spends seven days with a woman that changes his life. He waits for her return for fifteen years, visiting the same spot annually with no success. One day, he encounters a stranger who alters the course of his life. The book explores themes of waiting, hope, and destiny, questioning if the new encounter is the intended fulfillment of his desire or a distraction.",
                    language: "English",
                    image: "https://m.media-amazon.com/images/I/61zVyqJvZeL._SL1499_.jpg"
                });
            } else {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/get-book-by-id/${id}`
                );
                setData(response.data.data);
            }
        };
        fetch();
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };
    const handleFavourite = async () =>{
        const response = await axios.put("http://localhost:3000/api/v1/add-book-to-favourite",{},{headers});

        alert(response.data.message);
    };

    const handleCart = async ()=>{
        const response = await axios.put("http://localhost:3000/api/v1/add-to-cart",{},{headers});

        alert(response.data.message);
    };
    const deleteBook = async () => {
        try {
            const response = await axios.delete("http://localhost:3000/api/v1/delete-book", { headers });
            alert(response.data.message);
            navigate("/all-books");
        } catch (err) {
            alert("Failed to delete book.");
        }
    };
    return (
        <>
            {Data && (
                <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
                    <div className="w-full lg:w-3/6 flex justify-around">
                        <div className="flex justify-around bg-zinc-800 p-12 rounded">
                            <img
                                src={Data.image || "https://m.media-amazon.com/images/I/815R8kOqfHL._SL1500_.jpg"}
                                alt={Data.title || "Book cover"}
                                className="h-[50vh] lg:h-[70vh] rounded"
                                onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                            />
                            {isLoggedIn === true && role === "user" && (
                                <div className="flex md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                                    <button className="bg-white rounded-full text-3xl p-3 text-red-500 flex items-center justify-center" onClick={handleFavourite}>
                                        <FaHeart />{" "}
                                        <span className="ms-4 block lg:hidden">Favourites</span>
                                    </button>
                                    <button className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-4xl lg:text-3xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center" onClick={handleCart}>
                                        <FaShoppingCart />{" "}
                                        <span className="ms-4 block lg:hidden">Add to cart</span>
                                    </button>
                                </div>
                            )}

                            {isLoggedIn === true && role === "admin" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                                    <Link 
                                        to={`/updateBook/${id}`}
                                        className="bg-white rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center">
                                        <FaEdit />{" "}
                                        <span className="ms-4 block lg:hidden">Edit</span>
                                    </Link>
                                    <button className="text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 md:mt-0 lg:mt-8 bg:white flex items-center justify-center" onClick={deleteBook}>
                                        <FaShoppingCart />{" "}
                                        <span className="ms-4 block lg:hidden">Delete Book</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6">
                        <h1 className="text-4xl text-zinc-300 font-semibold">
                            {Data.title}
                        </h1>
                        <p className="text-zinc-400 mt-1">by {Data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            <GrLanguage className="me-3" />{Data.language}
                        </p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                            Price: {Data.price} {" "}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewDetails;