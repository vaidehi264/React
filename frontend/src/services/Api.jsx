import axios from 'axios';

const Api  = axios.create({
    baseURL: "http://localhost:5000/api/user",
})

export const registeruser = (data) => Api.post('/register', data);
export const verifyuser = (data) => Api.post('/verify-otp', data);
export const loginuser = (data) => Api.post('/login', data);

