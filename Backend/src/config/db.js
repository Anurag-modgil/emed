const mongoose = require("mongoose")

const mongoDbUrl='mongodb+srv://2021pietcshemant077:CpLKJZntzTWxPTbJ@cluster0.comvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}

