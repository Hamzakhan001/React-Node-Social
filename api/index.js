const express=require("express")
const app=express();
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const mongoose=require("mongoose")

dotenv.config();

mongoose.connect(process.env.MONDO_CONN);
mongoose.connection.on('connected', () => console.log('Connected'));



app.listen(9090,()=>{
	console.log("server running")
})