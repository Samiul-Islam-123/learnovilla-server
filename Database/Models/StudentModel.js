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
    gender : String,
    contactNumber : Number,
    address : Number,
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
        {
            link : String,
            label : String
        }
    ],

    hoobies : [{
        hobbie : String
    }],

    languages : [
        {
            language : String
        }
    ],
    
    timeStamp : Date,
})

const Model = new mongoose.model('students', Schema);
module.exports = Model;