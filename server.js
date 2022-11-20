const http = require("http");
const mongoose = require("mongoose");
const index_router = require('./routes/index')

require('dotenv').config();


const {MongoString, PORT} = process.env

// mongoose.connect(MongoString);
// const db = mongoose.connection;
// db.on("error", console.error.bind("Database error detected"));
// db.on("connected", () => {console.log("Database connected!")});


const server = http.createServer((req, res) => {
  index_router(req,res)
});

server.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});


