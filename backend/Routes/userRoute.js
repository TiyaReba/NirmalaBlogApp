const express = require('express');
const router = express.Router();
const user = require('../Model/user');

router.use(express.json());

// Signup api
router.post('/post',async(req,res)=>{
    try {
        const data = req.body;
        await user(data).save();
        res.status(200).json({message:"Registered successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Unable to register"})
    }
})

// login
router.post('/login',async(req,res)=>{
    let u = req.body.username;
    let p = req.body.password;
    const person = await user.findOne({username:u});
    if(!person){
        res.json({message:"User not found"});
    }
    try {
        if(person.password==p){
            res.status(200)
            .json({message:"Loged in successfully",person})
        }else{
            res.json({message:"Login failed"})
        }
    } catch (error) {
        console.log(error)
    }

})

router.get('/viewmypro/:id',async(req,res)=>{
    console.log(req.params.id);
    let userId = req.params.id;
    
    try {
        const item = await user.find({_id:userId});
        res.status(200).json(item)
    } catch (error) {
        console.log(error)
    }
})


module.exports=router;