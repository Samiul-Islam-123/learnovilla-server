const jwt = require('jsonwebtoken')

const generateAuthToken = async (credentials) => {
    try{
        const token = await jwt.sign(credentials, process.env.SECRET, {
            expiresIn : '30d'
        });

        return token;
    }
    catch(error){
        console.log(`Error occured while creating JWT token : ${error}`);
        throw error
    }
}

const verifyAuthToken = async (token) => {
    try {
        // Verify the token
        const decodedToken = await jwt.verify(token, process.env.SECRET);

        // Return the decoded token and the expired status
        return decodedToken
    } catch (error) {
        // If verification fails, log the error and return null
        console.log(`Error occurred while verifying JWT token: ${error}`);
        throw error
    }
}

module.exports = {generateAuthToken, verifyAuthToken};