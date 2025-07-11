const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");

const app = express();
const conn = require("./connection/conn");

app.use(express.json());

const user = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors());

app.use("/api/v1",user);
app.use("/api/v1",Books);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);


console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;                      

app.listen(PORT, async () => {
    await conn(); 
    console.log(`Server started at port ${PORT}`);
});

app.get("/test", (req, res)=>{
    res.send("Route Working");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error", error: err.message });
});
