import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  }
},{timeseries:true})

const auth = mongoose.model("auth",authSchema)
export default auth