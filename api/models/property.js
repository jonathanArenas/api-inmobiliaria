import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    street:{
        type: String,
        required: true,
    },
    noExt:{
        type: String,
        required: true,
    },
    noInt:{
        type:String,
        required: true,
    },
    zipCode:{
        type: String,
        required: true,
    },
    city:{
        type:String,
        required: true,
    },
    country:{
        type:String,
        required: true, 
    },
    locality:{
        type:String,
        required: true,
    },
    typeOffer:{
        type: String,
        enum: ['sale', 'rent'],
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    numBedrooms:{
        type:String,
        required: true,
    },
    photos:{
        type: [String],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message',
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('Property', propertySchema);