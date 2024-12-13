const jsonwebtoken = require('jsonwebtoken');

const generateToken = (payload,  expiresIn = null) => {
    const options = {}
    if(expiresIn){
        options.expiresIn = expiresIn
    }
    const token = jsonwebtoken.sign(payload, 'abcd' , options);
    return token;
};

module.exports = generateToken;
