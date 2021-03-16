const mongoose = require('mongoose');
const validator = require('validator');


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        validate(input) {
            return validator.escape(input);
        }
    },
    setInventory: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: Buffer
    }
},
{
    timestamps: true
})





const Product = mongoose.model('product', productSchema);

module.exports = Product;