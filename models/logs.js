const mongoose=require("mongoose");

const logschema= new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true,
        minlength:1,
        maxlegth:25
    },
    Description:{
        type:String,
        required:true,
        minlength:1,
        maxlegth:100
    },
    Content:{
        type:String,
        required:true,
        minlength:1,
        maxlegth:10000
    },
});

const log=mongoose.model("log",logschema);
module.exports=log;