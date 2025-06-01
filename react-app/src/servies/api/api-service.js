import api from './index';

/**
* Auth section
*/
export const login = (dataBody) => {
    return api.post('/login', dataBody);
}