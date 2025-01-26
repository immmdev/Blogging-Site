const express=require("express");
var methodOverride = require('method-override');
const app=express();
const port=8080;
const path=require("path");
const mongoose=require("mongoose");
const devlog=require("./models/devlogs.js");
const log=require("./models/logs.js");

main().then((res)=>{
    console.log("connection succesfull")
})
.catch((err) => {
    console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/devlogsDB');
}

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));



app.delete("/logs/:id", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body; // Ensure body-parser or equivalent middleware is used
    try {
        const user = await log.findById(id);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        if (user.Password !== password) {
            return res.status(403).send("Incorrect password.");
        }

        await log.findByIdAndDelete(id);
        res.redirect("/logs");
    } catch (err) {
        res.status(500).send("An error occurred while deleting the user.");
    }
});

app.get("/logs/detail/:id", async (req,res)=>{
    let {id}=req.params;
    let userDetail= await log.findById(id);
    res.render("detail.ejs",{userDetail});
})

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/signup",(req,res)=>{ // going to recieve data 
    res.render("signup.ejs");
});

app.get("/welcome",(req,res)=>{
    res.render("welcome.ejs");
});


app.post("/",(req,res)=>{  // recieving data
    let {fullname,username,phone,password}=req.body;
    let newuser= new devlog({
        fullName:fullname,
        userName:username,
        phoneNo:phone,
        password:password,
    })
    newuser.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err)
    });
    res.redirect("/")
})

app.get("/logs", async (req,res)=>{
    let users= await log.find();
    console.log(users);
    res.render("logs.ejs",{users});
});



app.get("/login",(req,res)=>{ //going to match data
    res.render("login.ejs");
    
});


app.post("/welcome", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await devlog.findOne({ userName: username });

        if (!user) {
            return res.status(401).send("Invalid username or password.");
        }

        if (username === user.userName && password === user.password) {
            return res.redirect("/welcome");
        } else {
            return res.status(401).send("Invalid username or password.");
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Internal server error. Please try again later.");
    }
});


// adding log to the table
app.get("/logs/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/logs", async (req,res)=>{
    let {conUsername,conPassword,title,description,content}=req.body;
    try{
        let con_userprofile= await devlog.findOne({userName:conUsername});
        let con_user=con_userprofile.userName;
        
        if(!con_user){
            console.log("user not found");
            return res.status(400).send("Invalid User name or password");
        }
        let con_pwd=con_userprofile.password;
        if(conPassword!==con_pwd){
            console.log("Invalid password");
            return res.status(400).send("Invalid username or password");
        }
            let newlog= new log({
                Username:conUsername,
                Password:conPassword,
                Title:title,
                Description:description,
                Content:content,
            });
            await newlog.save();
            console.log("Log saved successfully");
            let userProf=await log.findOne({Password:conPassword});
            res.redirect("/logs");

    } catch(err){
        console.error("Error:",err);
        res.status(500).send("Internal server error");
    }
});





// UUID package: universally unique identifier; npm install identifier
app.listen(port,()=>{
    console.log(`app is listening ${8080}`)
});
