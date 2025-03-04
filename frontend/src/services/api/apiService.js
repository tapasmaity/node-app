import api from "./index";

/*
* Auth
*/
const authLogin = (bodyData) => {
    return api.post(`/login`, bodyData);
}

/*
* home
*/
const getAllUsers = () => {
    return api.get(`/users`);
}

export {
    authLogin,
    getAllUsers
}