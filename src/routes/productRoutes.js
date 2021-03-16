const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const {checkUser, requireAuth} = require('../middleware/authMiddleware')
const multer = require('multer');
const Product = require('../models/Product');


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/products')
//     },
//     filename: function (req, file, cb) {
//         if (file.originalname.endsWith('.jpg')) {
//             cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//         }
//         if (file.originalname.endsWith('.png')) {
//             cb(null, file.fieldname + '-' + Date.now() + '.png')
//         }
//     }
//   })

  const upload = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb) {
       if (!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error ('File must be a jpg or png'));
       }
       cb(undefined, true)
        
    },
});

productRouter.get('/', productController.getAllProducts);

productRouter.post('/', checkUser, productController.addNewProduct);

productRouter.get('/view-products', productController.viewAllProducts);

productRouter.post('/upload/:id', checkUser, upload.single('img'), productController.uploadImage);

productRouter.get('/:id/image', productController.getImage);

productRouter.delete('/upload/:id',checkUser, productController.deleteImage);


module.exports = productRouter;
