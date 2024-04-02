const mongoose = require('mongoose');

const ConnectToDatabase = async(URL) => {
    //this function connects with Database
    try{
        console.log("Connecting to Database...");
        await mongoose.connect(URL);
        console.log("Connected to Database :)");
    }
    catch(error){
        console.log("Error occured while connecting to Database ", error);
    }
}

module.exports = ConnectToDatabase;