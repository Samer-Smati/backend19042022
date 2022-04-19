const express = require('express');
const connectDb = require('./config/connectDb');
const app = express();
const userRoute = require('./routes/user.routes')

require('dotenv').config()

app.use(express.json());

connectDb()

const PORT = process.env.PORT || 4000;

app.use('/api',userRoute)

app.listen(PORT,(err)=>{
    if (err) return console.error(err);
    console.log(`listening on port ${PORT}`);
})