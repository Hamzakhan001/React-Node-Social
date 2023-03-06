const router=require("express").Router()
const User=require("../models/User");
const bcrypt=require("bcrypt")



router.get("/register",async (req,res)=>{
	const user=await new User ({
		userName:"hamza",
		email:"john@gmail.com",
		password:'123455'
	})

	await user.save();
	res.send(ok)
})

router.post("/register",async(req,res)=>{
	try{
		const salt=await bcrypt.genSalt(10);
		const hashedPassword=await bcrypt.hash(req.body.password,salt)
		const newUser=new User({
			userName:req.body.userName,
			email:req.body.email,
			password:hashedPassword
		});
		const user=await newUser.save();
		res.status(200).json(user)
	}
	catch(err){
		console.error(err)
	}
})

router.post("/login",async(req,res)=>{
	try{
		const user=await User.findOne({email:req.body.email});
		if(!user && res.status(404).json("User not found!"));

		const validatePassword=await bcrypt.compare(req.body.password,user.password)
		if(!validatePassword){
			res.status(404).json("Password is not correct")
		}
		else{
			res.status(200).json(user)
		}
	}
	catch(err){
		res.status(500).json(err)
		console.error(err)
	}
})

module.exports=router