const GetRoutes = require('express').Router();
const StudentModel = require("./../../Database/Models/StudentModel")
const MentorModel = require("./../../Database/Models/MentorModel")


GetRoutes.get('/profile/:role/:user_id', async(req,res)=>{
    try{
        const role = req.params.role;
        const student_id = req.params.user_id;
    
        if(role === 'student'){
            //fetch from student database
            const StudentProfileData = await StudentModel.findOne({
                user_id : student_id
            })
    
            if(StudentProfileData){
                res.json({
                    success : true,
                    profileData : StudentProfileData 
                })
            }
    
            else
            {
                res.json({
                    success : false,
                    message : "Profile not found"
                })
            }
        }
    
        else{
            //fetch from mentor database

            //fetch from student database
            const MentorProfileData = await MentorModel.findOne({
                user_id : student_id
            })
    
            if(MentorProfileData){
                res.json({
                    success : true,
                    profileData : MentorProfileData 
                })
            }
    
            else
            {
                res.json({
                    success : false,
                    message : "Profile not found"
                })
            }
        }
    }
    catch(error){
        console.log(error)
        res.json({
            success : false,
            message : "Error occured"
        })
    }

})

module.exports = GetRoutes;