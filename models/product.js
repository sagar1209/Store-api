const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"please provide a name"],
    },
    price:{
        type:Number,
        required:[true,"please provide a price"],
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
        enum: {
            values: ['ikea','liddy','caressa','marcos'],
            message: '{VALUE} is not suppported'
        }
    }
})

module.exports = mongoose.model('Product',productSchema);