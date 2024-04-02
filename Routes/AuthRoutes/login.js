const Router = require('express').Router();
const UserModel = require('../../Database/Models/UserModel')

Router.post('/login', async(req,res)=>{
    //validating data
    if(!req.body.email || !req.body.password){
        res.json({
            success : false,
            message : "Insuficient Data"
        })
    }

    else
    {
        //matching with email
        const UserFound = await UserModel.findOne({
            email : req.body.email
        })

        if(UserFound){
            //checking password
            
        }

        else{
            res.json({
                success : false,
                message : "Email not found"
            })
        }
    }
})