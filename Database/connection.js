import mongoose from "mongoose";

const URL = "mongodb+srv://sandeepkharival123:6TerDEFnxfDX5MLk@cluster0.gfuzmle.mongodb.net/todo?retryWrites=true&w=majority"
export const Database = async() =>{
    try {
        await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser: true})
        .then(()=>{console.log("databse connected successfully");})
    } catch (error) {
        console.log("error while connecting databse",error);
    }
}