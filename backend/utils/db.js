const mongoose = require('mongoose')

async function connectDB(){
    const DB_URL=process.env.DB_URL
    const DB_NAME=process.env.DB_NAME
    try{
        await mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log("Database Connected");
    } catch(err){
        console.log('Mongoose Connection Error');
        throw err
    }
}  
 module.exports = connectDB