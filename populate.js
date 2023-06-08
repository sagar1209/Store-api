const express = require('express');
const app = express();
const MongoDb = require('./db/connect');
require('dotenv').config();
const Product = require('./models/product');
const productjson = require('./products.json');


const start = async()=>{
    try {
        await  MongoDb(process.env.MONGO_URL);
        await Product.deleteMany();
        await  Product.create(productjson);
        app.listen(3000,()=>{
            console.log("start the server");
        })
    } catch (error) {
        console.log(error);
    }
}

start();