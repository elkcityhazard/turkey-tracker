const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/signup', authController.signup_get);   // Get the signup page to create a new user

router.post('signup', authController.signup_post);  //  Post to signup route to create a new user and save to database

router.get('/login', authController.login_get); // Get the login page so we can log in our users

router.post('/login', authController.login_post);   //  Post to login a user



module.exports = router;