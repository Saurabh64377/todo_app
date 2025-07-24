const mongoose  = require('mongoose')
require('dotenv').config()

const connectDb = async()=>{
    try {
       const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE}`)
       console.log('Connected to Database')
        
    } catch (error) {
        console.log('Error connected to databse' , error)
        process.exit(1)
        
    }
}

module.exports = connectDb