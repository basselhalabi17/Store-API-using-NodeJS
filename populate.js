const connectDB = require('./db/connect')
const prodschema = require('./model/schema')
const products = require('./products.json')
require('dotenv').config()

const start = async ()=>{
    try{
        // connect db
        await connectDB(process.env.MONGO_URI)
        //delete any existing products
        await prodschema.deleteMany()
        //populate database 
        await prodschema.create(products)
        process.exit(0)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

start()