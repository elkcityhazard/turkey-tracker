const Product = require("../models/Product");
const sharp = require("sharp");

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    products,
  });
};

module.exports.viewAllProducts = (req, res, next) => {
  try {
    res.render("products", {
      title: "Shop Our Products",
      path: "/products/view-products",
    });
  } catch (err) {
    return res.status(400).json({
      msg: "Products not Found",
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
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250
    }).png().toBuffer()
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
      throw new Error("cannot find product or product image");
    }
    res.set("Content-Type", "image/jpeg");
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
      msg: "image deleted",
    });
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
};
