import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    const product = await Product.create({
        ...req.body,
    });
    res.status(201).json(product);
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(201).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch Products" });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)

        if (!product) {
            res.status(404).json({ message: "Product not Found !!" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "failed to fetch products" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};