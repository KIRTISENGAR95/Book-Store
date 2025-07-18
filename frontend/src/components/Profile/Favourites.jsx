import React from "react";
import { useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites=()=>{
    const [FavouriteBooks, setFavouriteBooks] = useState();
    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
        const fetch = async () =>{
            const response = await axios.get("http://localhost:3000/api/v1/get-favourite-books",
                { headers }
            );
            setFavouriteBooks(response.data.data);
        };
        fetch();
    },[]);


    return (
        <>
            {FavouriteBooks && FavouriteBooks.length === 0 && (
                <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center flex-col w-full">
                    No Favourite Books
                    <img src="https://imgs.search.brave.com/VIYPZ38qS2UmB0nnskGm5gNW8aD5bv52XqoDlIrsfB4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvcmFpc2VkLWFy/bS1ob2xkaW5nLWJv/b2stcmVhZGluZy1i/b29rcy1lZHVjYXRp/b24tbGVhcm5pbmct/YmFjay1zY2hvb2wt/Y29uY2VwdF8xNDgw/ODctMTI2LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDA" alt="book" className="h-[20vh] my-8" />
                </div>
            )}

            <div className="grid grid-cols-4 gap-4">
            
                {FavouriteBooks && Favourites.map((items,i)=>(
                    <div key={i}>
                        <BookCard data={items} favourite={true}/>
                    </div>
                ))}
            </div>
        </>
        
    );
};

export default Favourites;