const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    profilePictureURL : String,
    gender : String,
    contactNumber : Number,
    description : String,
    degree : String,
    certificates : [
        {
            fileURL : String,
            label : String
        }
    ],
    socialLinks : [
        {
            link : String,
            label : String
        }
    ],

    skills : [{
        skill : String
    }],

    experience : Number,

    language : String,
    
    timeStamp : Date,
})

const Model = new mongoose.model('mentors', Schema);
module.exports = Model;