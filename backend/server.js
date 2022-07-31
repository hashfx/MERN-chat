const express = require('express');  // import express
const dotenv = require('dotenv');

const app = express();  // instance of express
dotenv.config();

// get request to / route
// app.get('route', callback, response)
app.get('/', (req, res) => {
    res.send('Hello World');  // send response
});



// start express server on port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log("Server started on port ${PORT}"))
