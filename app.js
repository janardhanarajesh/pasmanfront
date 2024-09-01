import mongoose from "mongoose";
import cors from "cors"
import express from "express"
import bodyParser from "body-parser";
import User from "./models/user.js";
import Password from "./models/pass.js"
import Sec from "./models/test.js"
const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
mongoose.connect("mongodb+srv://janardhanarajesh2:lHmah9M0amKM1gM6@cluster0.a1r4v.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>app.listen(2005))
.then(()=>console.log("connected to database & listening to 2006"))
app.use("/test",(req,res,next)=>{
    res.send("server responding ")
})
app.post("/signup",(req,res,next)=>{
    const{username,usermail,password}=req.body.user;
    let us=new User({
        username:username,
        usermail:usermail,
        password:password
    })
    try{
       us.save()
       return res.status(200).json({msg:"success"})
    }
    catch(err){
        console.log("error")
    }
})

app.get("/checkuser/:name",async(req,res,next)=>{
    let nam=req.params.name;
    try{
        let user=await User.find({username:nam})
        if (user.length==0){
            return res.status(200).json({msg:"not found"})
        }
        else{
            return res.status(200).json({msg:"found"})
        }
    }
    catch(err)
    {
        console.log("error")
    }
})
app.get("/loguser/:name",async(req,res,next)=>{
    let nam=req.params.name;
    let pw
    try{
        let user=await User.find({username:nam})
        if (user.length==0)
        {
            return res.status(200).json({msg:"notfound"})
        }
        else{
            pw=user[0].password

            return res.status(200).json({msg:"found",pw})
        }
    }
    catch(err)
    {
        console.log("error")
    }
})
app.get("/getpassword/:user",async(req,res,next)=>{
    let us=req.params.user;
    console.log(us)
    let app;
    let pass;
    let disc;
    let passwords;
    try{
        let dat=await Password.find({username:us})
        if (dat.length==0)
        {
            
            return res.status(200).json({msg:"notfound"})

        }
        else{
            app=dat[0].application;
            pass=dat[0].password;
            disc=dat[0].discription;
            passwords=dat;

            return res.status(200).json({msg:"found",app,pass,disc,passwords})

        }
        }
        catch(err){
            console.log(err)
        }
})
app.get("/getpas/:app/:user",async(req,res,next)=>{
    let usm=req.params.app;
    let um=req.params.user;
    try{
        let dats=await Password.find({application:usm,username:um})
        console.log(dats.length)
        if (dats.length==0)
        {   
            return res.status(200).json({msg:"notfound"})
        }
        else{
            return res.status(200).json({msg:"found"})

        }
        }
        catch(err){
            console.log(err)
        }
})
app.post("/postpassword",(req,res,next)=>{
    const{application,discription,password,username}=req.body.paswrd
    let pas=new Password({
        application,
        password,
        discription,
        username
    })
    try{
        pas.save()
        return res.status(200).json({msg:"success"})

    }
    catch(err)
    {
        console.log("err")
    }
})
app.delete("/delone/:e",async(req,res,next)=>{
    let id=req.params.e;
    try{
        let sat=await Password.findByIdAndDelete(id)
        return res.status(200).json({msg:"deleted"})
    }
    catch(err)
    {
        console.log(err)
    }
})
app.put("/edituser/:id",async(req,res,next)=>{
    let da=req.params.id;
    const{username,password,application,discription}=req.body.pass
    try{
        let d=await Password.findByIdAndUpdate(da,{
            username,
            password,
            application,
            discription
        })
        return res.status(200).json({msg:"updated"})
    }
    catch(err)
    {
        console.log(err)
    }
})
app.post("/postsec",(req,res,next)=>{
    const{secdat,seckey}=req.body.sec
    let dat=new Sec({
        seckey,
        secdat
    })
    try{
        dat.save()
        return res.status(200).json({msg:"success"})
    }
    catch(err)
    {
        console.log(err)
    }
})
app.get("/getsec",async(req,res,next)=>{
    try{
        let de=await Sec.find()
        return res.status(200).json({msg:"done",de})
    }
    catch(err)
    {
        console.log(err)
    }
})