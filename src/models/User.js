const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');

//  create the user model

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'Minimum password is 6 characters']
    }
}, {
    timestamps: true
});

//  salt and hash the password before saving

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})

//   decrpyt the password and compare

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}

userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'owner'
})


const User = mongoose.model('user', userSchema);

module.exports = User;