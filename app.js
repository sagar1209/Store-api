require('dotenv').config();
require('express-async-errors')
const notFound = require('./middleware/not-found');
const errorhandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const products = require('./routes/products');
const express = require('express');
const app = express();


app.use(express.json());


app.get('/',(req,res)=>{
    res.send('<h1>store api</h1> <a href="/api/v1/products">products route</a>');
})
app.use('/api/v1/products',products);
app.use(notFound);
app.use(errorhandler);


const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT,()=>{
            console.log(`server is start on ${process.env.PORT}`);
        })

    } catch (error) {
        
    }
}

start();


