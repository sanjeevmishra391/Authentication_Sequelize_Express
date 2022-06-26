const { Product } = require('../models/index');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(product[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json({
            "message": "Product Created",
            "id" : product
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    console.log(req.params);
    try {
        await Product.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (error) {
        res.json({ message: error.message});
    }  
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }});
            res.json({
                "message": "Product Deleted"
            });
    } catch (error) {
        res.json({ message: error.message });
    }     
}