const router=require("express").Router()
const User=require("../models/User")



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
	const newUser=new User({
		userName:req.body.userName,
		email:req.body.email,
		password:req.body.password
	});

	try{
		const user=await newUser.save();
		res.status(200).json(user)
	}
	catch(err){
		console.error(err)
	}
})

module.exports=router