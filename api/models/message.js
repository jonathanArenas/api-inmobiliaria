import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    message:{
        type:String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    
})

export default mongoose.model('Message', messageSchema);