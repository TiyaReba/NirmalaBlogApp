const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tiya:tiya@cluster0.qh8z9se.mongodb.net/NirBlogApp?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("db conncted")
    })
    .catch((error)=>{
        console.log(error)
    })