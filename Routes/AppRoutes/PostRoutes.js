const PostRouter = require('express').Router();
const StudentModel =require('../../Database/Models/StudentModel')

const MentorModel = require('../../Database/Models/MentorModel')

PostRouter.post('/create-student', async(req,res)=>{
    try{
        const StudentData = req.body;
        // Iterate over each field in studentData
        for (const key in StudentData) {
            if (StudentData.hasOwnProperty(key)) {
                // Check if the field is undefined
                if (StudentData[key] === undefined) {
                    return res.status(400).json({ error: `Field '${key}' is undefined.` });
                }
            }
        }
    
        const CurrentStudent =  new StudentModel(StudentData)

        CurrentStudent.timeStamp = new Date().getTime();
    
        await CurrentStudent.save();
        res.json({
            success : true,
            message : "Student added successfully"
        })
    }
    catch(error){
        console.log(error);
        throw error;
        res.json({
            success : false,
            message : "Error occured :("
        })
    }
})

PostRouter.post('/create-mentor', async(req,res)=>{
    try{
        const MentorData = req.body;
        // Iterate over each field in MentorData
        for (const key in MentorData) {
            if (MentorData.hasOwnProperty(key)) {
                // Check if the field is undefined
                if (MentorData[key] === undefined) {
                    return res.status(400).json({ error: `Field '${key}' is undefined.` });
                }
            }
        }
    
        const CurrentMentor =  new MentorModel(MentorData)

        CurrentMentor.timeStamp = new Date().getTime();
    
        await CurrentMentor.save();
        res.json({
            success : true,
            message : "Mentor added successfully"
        })
    }
    catch(error){
        console.log(error);
        throw error;
        res.json({
            success : false,
            message : "Error occured :("
        })
    }
})

module.exports = PostRouter;