import mongoose from "mongoose";
let sch=mongoose.Schema
const User=new sch({
    username:{
        type:String,
        required:true
    },
    usermail:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    }
})
export default mongoose.model("User",User)