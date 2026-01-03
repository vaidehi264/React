import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

export const createOrder = async (orderData) => {
    return await Api.post('/api/orders', orderData);
};

export const getAllOrders = async () => {
    return await Api.get('/api/orders');
};

export const getOrderCount = async () => {
    return await Api.get('/api/orders/count');
};

export const deleteOrder = async (id) => {
    return await Api.delete(`/api/orders/${id}`);
};

export const updateOrderStatus = async (id, status) => {
    return await Api.patch(`/api/orders/${id}/status`, { status });
};

export const getUserOrders = async (userId) => {
    return await Api.get(`/api/orders/user/${userId}`);
};

