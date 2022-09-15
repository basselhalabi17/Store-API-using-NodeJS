 //Create Schema for database
 
 const mongoose = require('mongoose')

 const ProductSchema = new mongoose.Schema({
    name:{
      type:String,
       required: [true,'must provide name'],
       trim: true,
       maxlength: [20,'name cannot exceed 20 characters']
    },
       price:{
        type:Number,
        required: [true,'must provide price']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String, 
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} IS NOT SUPPORTED'
        }
        //enum:['ikea','liddy','caressa','marcos']
    }
 })

 module.exports = mongoose.model('Product',ProductSchema)