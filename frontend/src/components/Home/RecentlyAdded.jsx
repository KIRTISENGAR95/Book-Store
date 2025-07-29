import React, { useEffect, useState } from "react";
// import { FaFirstAid } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
    const [Data, setData] = useState();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:3000/api/v1/get-recent-books"
            );
            let books = response.data.data || [];
            
            books = [
                ...books,
                {
                    _id: "manual-added-1",
                    title: "Once We WERE Together",
                    author: "Vandana",
                    price: 59,
                    desc: "She Can't Be Her is a novel by Vandana, published by BookLeaf Publishing. The story follows Ethan, who spends seven days with a woman that changes his life. He waits for her return for fifteen years, visiting the same spot annually with no success. One day, he encounters a stranger who alters the course of his life. The book explores themes of waiting, hope, and destiny, questioning if the new encounter is the intended fulfillment of his desire or a distraction.",
                    language: "English",
                    image: "https://m.media-amazon.com/images/I/61zVyqJvZeL._SL1499_.jpg"
                }
            ];
            setData(books);
        };
        fetch();
    }, []);

    
    const filteredBooks = searchQuery
        ? Data?.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : Data;

    return (
        <div className="mt-8 px-4">
            <h4 className="text-3xl text-yellow-100">Recently added books</h4>
            <div className="mt-4">
                <Link
                    to="#"
                    className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full"
                    onClick={e => { e.preventDefault(); setShowSearch(!showSearch); }}
                >
                    Discover Books
                </Link>
            </div>
            {showSearch && (
                <input
                    type="text"
                    className="block mt-4 mb-4 p-2 border rounded w-full max-w-md text-white bg-zinc-800 placeholder-zinc-400"
                    placeholder="Type book name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            )}
            {!Data && (
                <div className="flex items-center justify-center my-8">
                    <Loader />
                </div>
            )}
            <div className="my-8 grid grid-cols-1 sm:grid-cols-4 gap-8">
                {filteredBooks &&
                    filteredBooks.map((items, i) => (
                        <div key={i}>
                            <BookCard data={items} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RecentlyAdded;