import api from './index';

/**
* Auth section
*/
const login = (dataBody) => {
    return api.post('/login', dataBody);
}

export {
    login
}