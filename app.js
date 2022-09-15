const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productrouter = require('./routes/product')
require('dotenv').config()

app.use(express.json())
const port = process.env.PORT || 7000

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

app.use('/api/v1/products',productrouter)

const start = async ()=>{
    try{
        // connect db
        await connectDB(process.env.MONGO_URI)
        //delete any existing products
        //await prodschema.deleteMany()
        //populate database (can be added in separate file)
        //await prodschema.create(products)
        app.listen(port,()=>{
            console.log("Store Home page")
        })
    }
    catch(error){
        console.log(error)
    }
}

start()

