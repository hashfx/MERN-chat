const express = require('express');  // import express
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDb = require('./config/db');
const colors = require('colors');

const app = express();  // instance of express
dotenv.config();
connectDb();


// get request to / route
// app.get('route', (callback, response))
app.get('/', (req, res) => {
    res.send('API running...');  // send response
});


// dummy API data for testing purpose

app.get("/api/chat", (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    const oneChat = chats.find((c) => c._id === req.params.id);  // search for _id in API data
    res.send(oneChat);
});



// start express server on port 5000
const PORT = process.env.PORT || 5000  // if PORT is not available, use port 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow));
