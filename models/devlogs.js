const mongoose=require("mongoose");

const logsSchema= new mongoose.Schema({
   fullName:{
    type:String,
    required:true
   },
   userName:{
    type:String,
    required:true
   },
   phoneNo:{
    type:Number,
    required:true,
    min:10,
   },
   password:{
    type:String,
    required:true
   },
})

const devlog=mongoose.model("devlog",logsSchema);

 module.exports=devlog;