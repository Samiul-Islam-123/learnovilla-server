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
    contactNumber : String,
    address : String,
    institutionName : String,
    academicYear : String,
    certificates : [
        {
            fileURL : String,
            label : String
        }
    ],
    description : String,
    socialLinks : [
       String
    ],

    hoobies : [{
        String
    }],

    languages : String,
    
    timeStamp : Date,
})

const Model = new mongoose.model('students', Schema);
module.exports = Model;