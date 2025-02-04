const express = require("express");
const { getProducts, createProducts, updateProducts, deleteProducts } = require('../controllers/product.controller.js');

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProducts);

router.put("/:id", updateProducts);

router.delete("/:id", deleteProducts)


module.exports = router;