import { api } from './index';

export class Auth {
    static postAuthSignIn(credentials) {
        return api.post('/auth/sign-in', credentials);
    }

    static postAuthSignUp(credentials) {
        return api.post('/auth/sign-up', credentials);
    }

    static deleteAuthSignOut() {
        return api.delete('/auth/sign-out');
    }
}
