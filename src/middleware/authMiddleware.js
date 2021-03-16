const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    //  bring in token
    const token = req.cookies.jwt;

    // check if json web token exists and is verifed
    if (token) {
            jwt.verify(token,
            process.env.JWTSECRET,
            (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    res.redirect('/login');
                }
                console.log(decodedToken);
                next();
            }
            )
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          req.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };


  


module.exports = {requireAuth, checkUser};