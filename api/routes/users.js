const router=require("express").Router();
const bcrypt=require("bcrypt")
const User=require('../models/User')


router.get("/",(req,res)=>{
	res.send("User")
});

router.put('/:id',async(req,res)=>{
	if(req.body.id==req.params.id || req.user.isAdmin){

		if(req.body.password){
			try{
				const salt=bcrypt.genSalt(10);
				req.body.password=await bcrypt.hash(req.body.password,hash)
			}
			catch(err){return res.status(500).json(err)}
		}
		try{
			const user=await User.findByIdAndUpdate(req.params.id,{
				$set:req.body
			});
			res.status(200).json("Account updated!")
		}
		catch(err){
			console.error(err)
		}
	}
	else{
		return res.status(403).json("You can update only your account!")
	}
})




module.exports=router