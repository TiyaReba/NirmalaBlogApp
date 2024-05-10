const express = require('express');
const router = express.Router();
const post = require('../Model/post');

router.use(express.json());

// to add blog
router.post('/addblog',async(req,res)=>{
    const blog = req.body;
    try {
        const data = await post(blog).save();
        res.status(200).json({message:"Blog added",data})
    } catch (error) {
        console.log(error);
        res.json({message:"Unable to add blog"})
    }
})

// to view all blogs
router.get('/viewall',async(req,res)=>{
    try {
        const data = await post.find();
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})

// to update
router.put('/edit/:id',async(req,res)=>{
    const userId= req.params.id;
    try {
        var item=req.body;
        console.log(item)
       const data= await post.findByIdAndUpdate(userId,item);
        res.status(200).send('Updated successfully');
    } catch (error) {
        res.status(404).send('Update not working');
    }

})


module.exports=router;