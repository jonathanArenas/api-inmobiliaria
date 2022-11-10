import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    birthDate:{
        type: Date,
        required: true,
    },
    dni:{
        type:String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'customer'],
        required: true,
    },
    pointContact:{
        type: [String],
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('User', userSchema);