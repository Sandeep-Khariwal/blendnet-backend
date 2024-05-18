import mongoose from "mongoose";

const watchListSchema = new mongoose.Schema({
  userId:{
    type:String
  },
  watchList:{
    type:Array,
    default:[]
  }
},{timeseries:true})

const watchList = mongoose.model("watchList",watchListSchema)
export default watchList