const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    timeStamp : Date,
})

const Model = new mongoose.model('users', Schema);
module.exports = Model;