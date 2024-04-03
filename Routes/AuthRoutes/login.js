const Router = require('express').Router();
const UserModel = require('../../Database/Models/UserModel');
const { verifyPassword } = require('./../../Utils/PasswordEncoding');
const { generateAuthToken } = require('../../Utils/TokenControls');

Router.post('/login', async (req, res) => {
    try {
        // Validating data
        if (!req.body.email || !req.body.password) {
            res.json({
                success: false,
                message: "Insufficient Data"
            });
        } else {
            // Matching with email
            const UserFound = await UserModel.findOne({
                email: req.body.email
            });

            if (UserFound) {
                // Checking password
                if (await verifyPassword(req.body.password, UserFound.password)) {
                    // Generate JWT token
                    const userData = {
                        username: UserFound.username,
                        user_id: UserFound._id,
                        email: UserFound.email
                    };
                    try{
                        const AuthToken = await generateAuthToken(userData);
                        res.json({
                            success: true,
                            message: "Login successful",
                            token: AuthToken
                        });
                    }
                    catch(error){
                        console.error("Error : "+error)
                        res.json({
                            success : false,
                            message : "Error occured while creating JWT token"
                        })
                    }
                } else {
                    res.json({
                        success: false,
                        message: "Wrong Password"
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: "Email not found"
                });
            }
        }
    } catch (error) {
        // Handle any errors that occurred during execution
        console.error("Error occurred during login:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

module.exports = Router;
