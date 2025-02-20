import mongoose from "mongoose"

const formSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
        },
        phone: {
            type:Number,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
    },{
        timeStamps:true,
    }
)

export const Form = mongoose.model('cat',formSchema)