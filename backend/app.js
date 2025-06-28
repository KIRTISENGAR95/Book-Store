const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const conn = require("./connection/conn");

app.use(express.json());

const user = require("./routes/user");
app.use("/api/v1",user);

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
    res.status(500).json({ message: 'Internal server error', error: err.message });
});
