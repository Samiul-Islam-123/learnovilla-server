const bcrypt = require('bcrypt');

const EncodePassword = async(originalPassword) => {
    const salt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(originalPassword, salt);
    return encodedPassword;
}

const verifyPassword = async(originalPassword, hashedPassword) => {
    //verifying the password
    const verification = await bcrypt.compare(originalPassword, hashedPassword);
    return verification;
}

module.exports = {EncodePassword, verifyPassword};