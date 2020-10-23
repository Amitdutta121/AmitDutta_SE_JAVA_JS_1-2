import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:2999/products/",
    headers: {
        "Content-type": "application/json"
    }
});

const users = axios.create({
    baseURL: "http://localhost:2999/user/",
    headers: {
        "Content-type": "application/json"
    }
});
export {users}
