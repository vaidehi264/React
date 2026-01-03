import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
    try {
        const { items, customer, totalAmount, paymentId, userId } = req.body;
        const newOrder = new Order({
            items,
            customer,
            totalAmount,
            paymentId,
            userId
        });
        const savedOrder = await newOrder.save();

        // Mark items as booked
        const productIds = items.map(item => item.productId);
        await Product.updateMany(
            { _id: { $in: productIds } },
            { $set: { isBooked: true, bookedBy: userId } }
        );

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Release products
        const productIds = order.items.map(item => item.productId);
        await Product.updateMany(
            { _id: { $in: productIds } },
            { $set: { isBooked: false, bookedBy: null } }
        );

        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted and products released successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderCount = async (req, res) => {
    try {
        const count = await Order.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
