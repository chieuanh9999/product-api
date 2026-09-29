const Product = require("../models/Product");

// CREATE - Thêm sản phẩm
const createProduct = async (req, res) => {
    try {
        const { pid, pname, price, quantity } = req.body;

        const existingProduct = await Product.findOne({ pid });

        if (existingProduct) {
            return res.status(400).json({
                message: "Product pid already exists"
            });
        }

        const product = new Product({
            pid,
            pname,
            price,
            quantity
        });

        const savedProduct = await product.save();

        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// READ ALL - Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// READ ONE - Lấy sản phẩm theo pid
const getProductByPid = async (req, res) => {
    try {
        const product = await Product.findOne({
            pid: req.params.pid
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE - Cập nhật sản phẩm theo pid
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { pid: req.params.pid },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: product
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE - Xóa sản phẩm theo pid
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            pid: req.params.pid
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductByPid,
    updateProduct,
    deleteProduct
};