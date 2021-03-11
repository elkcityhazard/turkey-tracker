const User = require('../models/User');

module.exports.signup_get = async (req, res) => {
    try {
        res.render('signup');

    } catch(err) {
        return res.status(400).json({
            msg: err.message
        })
    }

}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.create({email, password});
    console.log(user);
    try {
        res.header('Content-Type', 'application/json');
        res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }

}

module.exports.login_get = async (req, res) => {
    try {
        res.render('login');

    } catch(err) {
        return res.status(400).json({
            msg: err.message
        })
    }

}

module.exports.login_post = async (req, res) => {
    
}