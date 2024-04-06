import { api } from 'requests/index';

export class Post {
    static getPostList() {
        return api.get('/post');
    }

    static createPost(post) {
        return api.post('/post', post);
    }
}
