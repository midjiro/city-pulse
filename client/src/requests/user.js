import { api } from './index';

export class User {
    static getUser() {
        return api.get('/user');
    }

    static putUser(update, config) {
        return api.put('/user', update, config);
    }

    static deleteUser() {
        return api.delete('/user');
    }
}
