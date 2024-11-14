const express=require("express");
var methodOverride = require('method-override');
const app=express();
const port=8080;
const path=require("path");

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));



app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {   
        id:uuidv4(),
        username:"imm_dev",
        content:"i love coding"
    },
    {   
        id:uuidv4(),
        username:"shradhhakhapra",
        content:"hardwork is important to achieve success"
    },
    {
        id:uuidv4(),
        username:"anshumansingh",
        content:"i love gaming"
    }
];

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{ //getting request on get
    res.render("new.ejs");
});



app.post("/posts",(req,res)=>{ //sending data to /posts
    console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4(); 
    posts.push({id,username,content});
    res.redirect("/posts"); //connecting webpages using redirect

});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    console.log(newContent);
    let post=posts.find((p) => id === p.id);
    post.content=newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p) => id !== p.id);
    res.redirect("/posts");

});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.get("/posts/:id",(req,res) => {
    let {id}=req.params;
    let post=posts.find((p) => id === p.id);
    console.log(post);
    console.log(req.params);
    res.render("view.ejs",{post});
});



// UUID package: universally unique identifier; npm install identifier
app.listen(port,()=>{
    console.log(`app is listening ${8080}`)
});
