const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'Incorrect Email') {
    errors.email = 'The email is incorrect';
  }

  // incorrect password
  if (err.message === 'Incorrect Password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create token

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: maxAge,
  });
};

//  GET Path to show signup page

module.exports.signup_get = (req, res) => {
  res.render('signup', {
    path: '/signup',
  });
};

// POST Path to create new user

module.exports.signup_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(500).json({ errors });
  }
};

//  PATCH Path to update an existing user

module.exports.updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['password'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  //  Check to see if the updated properties are invalid

  if (!isValidOperation) {
    return res.status(400).send({
      msg: 'The property you are trying to update is not available',
    });
  }

  //  IF updates exist in database

  try {
    if (req.body.password) {
      let password = req.body.password;
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      req.body.password = password;
    }
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send({
        msg: 'User not found',
      });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).send({
      msg: err.message,
    });
  }
};

//  Delete A User that is stored in the database

module.exports.DeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    await user.remove();
    if (!user) {
      return res.status(404).json({
        msg: 'The user could not be found',
      });
    }
    res.status(200).json({
      user: user,
      msg: 'user and products have been deleted',
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports.login_get = (req, res) => {
  res.render('login', {
    path: '/login',
  });
};

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(500).json({ errors });
  }
};

module.exports.logout_get = (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/', 200, {
    path: '',
  });
};

module.exports.turkeys_get = (req, res, next) => {
  try {
    res.status(200).render('products', {
      path: ''
    });
  } catch (err) {
    res.status(401).json({
      msg: 'you are not logged in',
    });
  }
};
