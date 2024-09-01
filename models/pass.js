import mongoose from "mongoose";
let sch2=mongoose.Schema;
const pas=new sch2({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    application:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    }
    
})
export default mongoose.model("Password",pas)