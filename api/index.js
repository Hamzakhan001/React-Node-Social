const express=require("express")
const app=express();
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const mongoose=require("mongoose");

//routes
const userRoute=require("./routes/users")
const authRoutes=require("./routes/auth")

dotenv.config();
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users",userRoute)
app.use("/api/auth",authRoutes)


app.get("/",(req,res)=>{
	res.send("HomePage!")
})

mongoose.connect(process.env.MONDO_CONN);
mongoose.connection.on('connected', () => console.log('Connected'));



app.listen(9090,()=>{
	console.log("server running")
})