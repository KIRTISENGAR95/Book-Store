//  loads environment variables from a .env file into process.env
const mongoose = require("mongoose");                  // Used to connect and interact with MongoDB

const conn = async () => {                             //  asynchronous function named (conn) to connects to MongoDB
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)             // Connects to MongoDB using the URI from the environment variable
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports=conn;                         // exports the conn function so that it can be used in another file.
