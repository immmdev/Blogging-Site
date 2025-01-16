const mongoose=require("mongoose");
const devlog=require("./models/devlogs.js")

main().then((res)=>{
    console.log("connection succesfull")
})
.catch((err) => {
    console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/devlogsDB');
};


const logs=[{
    fullName:"Dev Singh",
    userName:"imm_dev",
    phoneNo:7235898946,
    password:"c17h35coona"
},
{
    fullName:"Sachin Yadav",
    userName:"imm_sachin",
    phoneNo:7235898646,
    password:"c17h35coona2"}];
 
devlog.insertMany(logs);