import api from "./index";

/*
* Auth
*/
const authLogin = (bodyData) => {
    return api.post(`/login`, bodyData);
}

export {
    authLogin
}