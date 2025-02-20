import mongoose from "mongoose"

const formSchema = new mongoose.Schema(
    {
        userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
        //    type: String,
        //    required:true,
        },
        text: {
            type:String,
            required:true,
        },
        profile_image_id: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files" },
    },{
        createdAt: {
             type: Date, default: Date.now 
            }
    }
)

export const Form2 = mongoose.model('cat2',formSchema)