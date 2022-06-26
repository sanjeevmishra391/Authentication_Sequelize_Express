const express = require('express');
 
const { 
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/products.controller.js");
 
const router = express.Router();
 
router.get('/', getAllProducts);    
router.get('/:id', getProductById);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
 
module.exports = router;