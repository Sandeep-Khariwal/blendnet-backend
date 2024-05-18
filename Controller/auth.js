import auth from "../Modals/auth.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async(req,resp)=>{
    try {
        const {name , email , password} = req.body

        const isExist = await auth.findOne({email:email})
        if(isExist){
            resp.status(200).json({success:false,message:"User Already Exist"})
        }
        else{
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password,salt)

            const newuser = await new auth({
                name,
                email,
                password:passwordHash
            }).save()

            var token = await jwt.sign({_id:newuser._id},process.env.SECRET_KEY,{expiresIn:"7d"})
            delete newuser.password;
            console.log("newuser.id : ",newuser.id);
            // resp.status(201).json({success:true,message:"Registration Success",newuser,token,userId:newuser.id})
        }
    } catch (error) {
        console.log("Error in registration ", error);
        resp.status(401).json({message:error})
    }
}

export const Login = async(req,resp)=>{
    try {

        const { email , password } = req.body
        const user = await auth.findOne({email:email})

        if(!user){
            resp.status(400).json({success:false,message:"User Not Resgistered"})
        }
        else{
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                resp.status(200).json({success:false,message:"Invalid Curredential"})
            } else{
                var token = await jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"7d"})
                console.log("newuser.id : ",user.id);
                resp.status(200).json({success:true,message:"User Login successfully",token,userId:user.id})
            }
        }
        
    } catch (error) {
        console.log("Error while loggin in", error);
        resp.status(500).json({success:false,error})
    }
}
