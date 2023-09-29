const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422, {
                messege: 'Invalid Username or Password'
            });
        }
        return res.json(200, {
            messege: 'Signed In successfully, here is your token, Please keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
            }
        })
    } catch (error) {
        console.log(`********${error}`);
        return res.json(500, {
            messege: 'Internal Server Error'
        });
    }
};