const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
   
    title : String,
    description : String,
    content : {
        thumbnail : String,
    },
    timeStamp : Date,
})

const Model = new mongoose.model('courses', Schema);
module.exports = Model;