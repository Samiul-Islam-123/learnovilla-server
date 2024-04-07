const {EncodePassword} = require('../../Utils/PasswordEncoding');
const UserModel = require('../../Database/Models/UserModel')

const Router = require('express').Router();

Router.post('/signup', async(req,res)=>{
    // validation of input Data
    if(!req.body.username || !req.body.email || !req.body.password){
        res.json({
            success : false,
            message : "Insufficient Data"
        })
    }

    else{
        try{
            // Secure Password
            const securedPassword = await EncodePassword(req.body.password);
    
            //creating Current User
            const CurrentUser = new UserModel({
                username : req.body.username,
                email : req.body.email,
                password : securedPassword,
                timeStamp : new Date().getTime()
            })
    
            //saving currentUser Data
            await CurrentUser.save();
    
            //sending response to user
            res.json({
                success : true,
                message : "User Signed Up successfully",
                user_id : CurrentUser._id
            })
        }
        catch(error){
            console.log("Error occured during Signup : ",error);
            res.json({
                success : false,
                message : "Error occured during Signup"
            })
        }
    }
})

module.exports = Router;