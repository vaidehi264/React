import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

// Helper to get token
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return { headers: { Authorization: token } };
};

export const getAllProducts = () => Api.get("/api/admin");

export const getSingleProduct = (id) => Api.get(`/api/admin/${id}`);

export const createProduct = (data) => Api.post("/api/admin", data, getAuthHeaders());

export const bulkCreateProducts = (data) => Api.post("/api/admin/bulk", data, getAuthHeaders());

export const updateProduct = (id, data) => Api.put(`/api/admin/${id}`, data, getAuthHeaders());

export const deleteProduct = (id) => Api.delete(`/api/admin/${id}`, getAuthHeaders());

export const getProductCount = () => Api.get('/api/admin/count');

export default Api;