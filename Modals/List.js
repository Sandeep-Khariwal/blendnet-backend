import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  todo:{
    type:String,
  }
},{timeseries:true})

const List = mongoose.model("list",listSchema)
export default List