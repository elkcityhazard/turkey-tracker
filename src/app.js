const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 4000;
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const {requireAuth, checkUser, checkProduct} = require('./middleware/authMiddleware');

const app = express();

//  middleware
app.use('/static', express.static(path.join(__dirname, 'public'))) // make public folder available for styles and front end js
app.use(express.json());
app.use(cookieParser());

// view engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to the database and start the server

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(port, () => {
    console.log('listening on port: ', port)
}))
.catch((err) => console.log(err));

// Routes
app.get('*', checkUser);
app.get('/', (req, res) => {
    res.render('home', {
        path: ''
    })
});

app.get('/edit-product', requireAuth, async (req, res) => {
    res.render('edit-product', {
        title: 'Add New Products',
        path: '/add-products'
    })
})

app.use('/api/user', authRoutes);
app.use('/api/products', productRoutes);