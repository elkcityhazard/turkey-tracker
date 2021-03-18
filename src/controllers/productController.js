const Product = require('../models/Product');
const sharp = require('sharp');

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find({});
  console.log(products);
  if (!products) {
    throw Error('cannot be found');
  }
  res.status(200).json({
    products,
  });
};

exports.viewAllProducts =  (req, res, next) => {
res.render('products', {
      title: 'Shop Our Products',
      path: '/api/products/view-products',
    });
};

module.exports.viewSingleProduct = async (req, res) => {
  console.log(req.params.id)
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.locals.product = product;
    console.log(res.locals.product)
    if (!product) {
      return res.status(404).json({
        msg: 'Product not found',
      });
    }
    res.status(200).render('single-product', {
      path: '/api/products/:id',
    });
  } catch (err) {
    return res.status(404).json({
      msg: err.message,
    });
  }
};

exports.addNewProduct = async (req, res, next) => {
  const id = req.user._id;
  console.log(id);
  const { name, price, description, setInventory, sold } = req.body;
  try {
    const owner = id;
    const product = await Product.create({
      name,
      owner,
      price,
      description,
      setInventory,
      sold,
    });
    res.status(200).json({
      product,
    });
  } catch (err) {
    return res.status(400).json({
      msg: err.message,
    });
  }
};

module.exports.uploadImage = async (req, res, next) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  try {
    const product = await Product.findById(req.params.id);
    product.image = buffer;
    product.save();
    res.status(200).json({
      product,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports.getImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product.image);
    if (!product || !product.image) {
      throw new Error('cannot find product or product image');
    }
    res.set('Content-Type', 'image/jpeg');
    res.send(product.image);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const product = await Product.findById({
      _id: req.params.id,
    });
    product.image = undefined;
    await product.save();
    res.status(200).json({
      id: product._id,
      msg: 'image deleted',
    });
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
};
