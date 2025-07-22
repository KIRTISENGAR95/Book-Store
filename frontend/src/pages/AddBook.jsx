import axios from "axios";
import React from "react";
const AddBook = () =>{
    const [Data, setData] = useState({
        url:"https://m.media-amazon.com/images/I/3184Ow%2BXPvL._SX342_SY445_QL70_FMwebp_.jpg",
        title:"Bound by your spirit",
        author:"Vandana",
        price:"49",
        desc:"Set in ancient Jaipur, \"Bound by Your Spirit\" is a captivating tale of love, loss, and mystery. Ansuya's life is torn between the haunting memories of her lost love, Ram, and her burgeoning bond with Prince Manvik. As secrets unravel and betrayals emerge, Ansuya faces impossible choices that will shape her destiny. With a perfect blend of romance, intrigue, and the supernatural, this gripping novel will keep you on the edge of your seat, eager to discover how past and present collide in a story of enduring love and redemption.",
        language:"English",
    });

    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
    };

    const change = (e) =>{
        const {name,value} = e.target;
        setData({...Data,[name]:value});
    }

    const submit = async() =>{
        try {
            if(
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language ===""
            ){
                alert("All fields are required");
            }else{
                const response = await axios.post(
                    "http://localhost:3000/api/v1/add-book",
                    Data,
                    {headers}
                )
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return(
        <div className="h-[100%] p-0 md:p-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                Add Book
            </h1>
            <div className="p-4 bg-zinc-800 rounded">
                <div>
                    <label htmlFor="" className="text-zinc-400">
                        Image
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-100 p-2 outline-none"
                        placeholder="url od image"
                        name="url"
                        required
                        value={Data.url}
                        onChange={change}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Title of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="title of book"
                        name="title"
                        required
                        value={Data.title}
                        onChange={change}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Author of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="author of book"
                        name="author"
                        required
                        value={Data.author}
                        onChange={change}
                    />
                </div>
                    <div className="mt-4 flex gap-4">
                        <div className="w-3/6">
                            <label htmlFor="" className="text-zinc-400">
                                Language
                            </label>
                            <input
                                type="text"
                                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                                placeholder="language of book"
                                name="language"
                                required
                                value={Data.language}
                                onChange={change}
                            />
                        </div>
                        <div className="w-3/6">
                            <label htmlFor="" className="text-zinc-400">
                                Price
                            </label>
                            <label htmlfor="" className="text-zinc-400">
                                Description of book
                            </label>
                            <textarea
                                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                                rows="5"
                                placeholder="description of book"
                                name="desc"
                                required
                                value={Data.desc}
                                onChange={change}
                            />
                        </div>

                    </div>
                    

                </div>
                <button
                    className="mt-4 px-3 bg-blue-500 text-semibold py-2 rounded hover:bg-blue-600 transition"
                    onClick={submit}
                >
                    Add Book
                </button>
        </div>
        
    )
}

export default AddBook;
