import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000"});

export const getAllProducts = () => Api.get("/api/admin/all");
