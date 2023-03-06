const router=require("express").Router();
const bcrypt=require("bcrypt")
const User=require('../models/User')


router.get("/:id",async(req,res)=>{
	try{
		let user=await User.findById(req.params.id);
		res.status(200).json(user)
	}
	catch(err){
		res.status(500).json(err)
	}
	
});

router.put('/:id',async(req,res)=>{
	if(req.body.id==req.params.id || req.body.isAdmin){

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

router.delete('/:id',async(req,res)=>{
	if(req.body.id==req.params.id || req.body.isAdmin){

		try{
			const user=await User.findByIdAndDelete(req.params.id);
			res.status(200).json("Account deleted!")
		}
		catch(err){
			console.error(err)
		}
	}
	else{
		return res.status(403).json("You can delete only your account!")
	}
})





module.exports=router