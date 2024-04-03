const Router = require('express').Router();
const UserModel = require('../../Database/Models/UserModel');
const { verifyPassword } = require('./../../Utils/PasswordEncoding');
const { verifyAuthToken } = require('../../Utils/TokenControls');

Router.post('/verify', async (req, res) => {
    try {
        const Verification = await verifyAuthToken(req.body.token);
        res.json({
            success : true,
            Verification : Verification
        })
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
