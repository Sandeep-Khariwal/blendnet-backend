import List from "../Modals/List.js";

export const AddToDo = async(req,resp) =>{
    try {
        const {todo} = req.body
        const result = await new List({todo}).save()
        resp.status(200).json({success:true,message:"todo Addedd"})
    } catch (error) {
        console.log("Error in AddToDo ", error);
        resp.status(500).json({success:false,message:"todo not Addedd"})
    }
}

export const GetById = async(req,resp)=>{
    try {

        const {id} = req.params
        const findtodo = await List.findById(id)
        if(findtodo){
            resp.status(200).json({success:true,message:"todofound",todo:findtodo})
        } else {
            resp.status(404).json({success:false,message:"todo not found"})   
        }

    } catch (error) {
        console.log("Error in GetById ", error);
        resp.status(500).json({success:false,message:"todo not found"}) 
    }
}

export const EditToDo = async(req,resp) =>{
    try {
        const {id} = req.params
        const {todo} = req.body
    
        // const findtodo = await List.findById(id)
        // if(findtodo){
            const eddited = await List.findByIdAndUpdate(id,{todo},{new:true})
            resp.status(200).json({success:true,message:"todo edditted",eddited})
        // }
    } catch (error) {
        console.log("Error in EditToDo ", error);
        resp.status(500).json({success:false,message:"todo not Editted"})
    }
}

export const GetAllToDo = async(req,resp)=>{
    try {
        const alltodo = await List.find({})
        if(alltodo){
            resp.status(200).json({success:true,alltodo})
        } else {
            resp.status(500).json({success:false,message:"ToDo Empty"})
        }
    } catch (error) {
        console.log("Error in GetAllToDo ", error);
        resp.status(500).json({success:false,message:"Alltodo not found"})  
    }
}