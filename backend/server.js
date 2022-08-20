const express = require('express');  // import express
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDb = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');

const app = express();  // instance of express
dotenv.config();
connectDb();

app.use(express.json());  // accept the json data from frontend for backend purposes


// get request to / route
// app.get('route', (callback, response))
app.get('/', (req, res) => {
    res.send('API running...');  // send response
});


// dummy API data for testing purpose

// app.get("/api/chat", (req, res) => {
//     res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//     const oneChat = chats.find((c) => c._id === req.params.id);  // search for _id in API data
//     res.send(oneChat);
// });

// end point routes for user
app.use('/api/user', userRoutes)

// error handling in case user visits undefined or non-existing path
app.use(notFound)  // if above URLs doesn't work, it falls down to notFound
app.use(errorHandler)  // if still throws error, it falls down to errorHandler

// start express server on port 5000
const PORT = process.env.PORT || 5000  // if PORT is not available, use port 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow));
