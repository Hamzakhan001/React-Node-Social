const router=require("express").Router()
const Post=require("../models/Post")


router.post("/",async(req,res)=>{
	const newPost=new Post(req.body)
	try{
		const savedPost=await new newPost.save();
		res.status(200).json(savedPost)
	}
	catch(err){
		res.status(500).json(err)
	}
});



router.put("/:id",async(req,res)=>{

	const post=Post.findById(req.params.id);
	if(post.userId==req.body.userId){
		await post.updateOne({$set:req.body});
		res.status(200).json("Post has been updated!")

	}
	else{
		res.status(403).json("You can only delete your own post!")
	}

})



module.exports=router;