const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {checkUser} = require('../middleware/authMiddleware');


router.get('/signup', authController.signup_get);   // Get the signup page to create a new user

router.post('/signup', authController.signup_post);  //  Post to signup route to create a new user and save to database

router.get('/login', authController.login_get); // Get the login page so we can log in our users

router.post('/login', authController.login_post);   //  Post to login a user

router.get('/turkeys', checkUser, authController.turkeys_get); // This is a protected Route that can only be accessed if the user is authenticated

router.get('/logout', authController.logout_get) // Log Out the User By setting JWT to null and making max Age 1ms;



module.exports = router;