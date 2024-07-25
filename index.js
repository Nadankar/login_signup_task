const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const userinfo=require("./mongoose");
const mongoose=require("mongoose");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));


main()
.then(()=>{
    console.log("mongoDB connection was successful");
})
.catch(err => console.log(err));

async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/login_signup');
await mongoose.connect('mongodb://localhost:27017/login_signup');
}

app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/signup",async(req,res)=>{
    const info={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    console.log(info);
    await userinfo.insertMany([info]);

    res.render("home");
   
})
app.get("/login",(req,res)=>{
    res.render("login");
})



app.post("/login",async(req,res)=>{
    try{
        let check= await userinfo.findOne({username:req.body.username});
        if(check.password===req.body.password&&check.email===req.body.email){
          
            res.render("home");
           
        }
        else{
            res.send("Please enter correct info");
        }
        }catch{
            res.send("Account not exist");
    }
})





app.listen(port,(req,res)=>{
    console.log(`server is listening on a port ${port}`);
})