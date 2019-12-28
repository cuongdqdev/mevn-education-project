const UserModel            = require('../database/user-coll');

class User {
    static register({ username, password }) {
        return new Promise(async resolve => {
            try {
                
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static login({ username, password }) {
        return new Promise(async resolve => {
            try {
                
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static logout({ }) {
        return new Promise(async resolve => {
            try {
                
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
}