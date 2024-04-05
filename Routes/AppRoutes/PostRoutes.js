const PostRouter = require('express').Router();
const StudentModel =require('../../Database/Models/StudentModel')

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

module.exports = PostRouter;