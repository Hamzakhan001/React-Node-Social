const router=require("express").Router();
const bcrypt=require("bcrypt")
const User=require('../models/User')


router.get("/:id",async(req,res)=>{
	try{
		let user=await User.findById(req.params.id);
		const {password,updatedAt,...other}=user._doc
		res.status(200).json(other)
	}
	catch(err){
		res.status(500).json(err)
	}
	
});

router.put("/:id/follow",async (req,res)=>{
	if(req.body.userId !== req.params.id){
		const user=await User.findById(req.params.id);
		const currentUser=await User.findById(req.body.userId);

		if(!user.followers.includes(req.body.userId)){
			await user.updateOne({$push:{followers:req.body.userId}})
			await currentUser.updateOne({$push:{followings:req.params.id}})
		}
		else{
			res.status(403).json("You already follow this account!")
		}

	}
	else{
		res.json(403).json("You can't follow yourself!")
	}
})

router.put("/:id/unfollow",async (req,res)=>{
	if(req.body.userId !== req.params.id){
		const user=await User.findById(req.params.id);
		const currentUser=await User.findById(req.body.userId);

		if(user.followers.includes(req.body.userId)){
			await user.updateOne({$pull:{followers:åreq.body.userId}})
			await currentUser.updateOne({$pull:{followings:req.params.id}});
			res.status(200).json("user has been unfollowed!")
		}
		else{
			res.status(403).json("You don't follow this account!")
		}

	}
	else{
		res.json(403).json("You can't unfollow yourself!")
	}
})


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