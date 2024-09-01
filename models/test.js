import mongoose, { Schema } from "mongoose";
let sec=mongoose.Schema;
const newsec = new sec({
    secdat:{
        type:String,
        required:true
    },
    seckey:{
        type:String,
        required:true
    }
})
export default mongoose.model("Sec",newsec)