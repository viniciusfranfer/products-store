const Product = require("../models/product.model.js");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const productsWithIdAsString = products.map(product => ({
      ...product.toObject(),
      id: product._id.toString(),
      _id: undefined,  
    }));
    
    res.status(200).json({ success: true, data: productsWithIdAsString });
  } catch (error) {
    console.log(`Error in get products ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


const createProducts = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(`Error in creating product${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }

}

const updateProducts = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
}

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product has been deleted" });
  } catch (error) {
    console.log(`Error in deleting product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = { getProducts, createProducts, updateProducts, deleteProducts };