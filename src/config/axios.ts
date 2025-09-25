import axios from "axios";

export const instance = axios.create({
    baseURL: "http://mystock_auth_service:3000/api/auth",
    timeout: 20000,
});
