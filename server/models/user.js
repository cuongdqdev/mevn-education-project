const USER_COLLECTION            = require('../database/user-coll');
const bcrypt                     = require('bcrypt');
const jwt                        = require('jsonwebtoken');
const { SECRET_JWT }             = require('../config');

let login = ({ username, password }) => {
    return new Promise(async resolve => {
        try {
            if(!username || !password)
                return resolve({ error: true, messsage: 'invalid_params'});
                
            let infoUser = await USER_COLLECTION.findOne({ username, attempLogin: { $lt: 5 } });
            if(!infoUser) 
                return resolve({ error: true, messsage: 'login_fail'});
            
            let {_id: userID, password: userPassword } = infoUser;

            let checkHashPasswod = await bcrypt.compare(password, userPassword);
            if(!checkHashPasswod) {
                await USER_COLLECTION.findByIdAndUpdate(userID, {
                    $inc: { attempLogin: 1 }
                });
                return resolve({ error: true, messsage: 'login_fail'});
            }

            await USER_COLLECTION.findByIdAndUpdate(userID, {
                attempLogin: 0
            }, { new: true });
            
            infoUser.password = undefined; // do not return password             

            return resolve({ error: false, data: infoUser });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let register = ({ username, password }) => {
    return new Promise(async resolve => {
        try {
            if(!username || !password)
                return resolve({ error: true, messsage: 'invalid_params'});

            let checkExistUser = await USER_COLLECTION.findOne({ username });
            if(checkExistUser)
                return resolve({ error: true, messsage: 'existed_username'});

            let salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(password, salt);
            if(!hashPassword)
                return resolve({ error: true, messsage: 'hash_password_fail'});
            
            let infoUser = new USER_COLLECTION({ username, password: hashPassword });
            let infoUserAfterInserted = await infoUser.save();
            if(!infoUserAfterInserted) 
                return resolve({ error: true, messsage: 'insert_user_fail'});

            infoUserAfterInserted.password = undefined; // do not sign password in jwt
            let token = jwt.sign({ data: infoUserAfterInserted },
                SECRET_JWT,
                { 
                    expiresIn: '24h' // expires in 24 hours
                }
            );
            let { _id: userID } = infoUserAfterInserted;
            let infoUserAfterUpdated = await USER_COLLECTION.findByIdAndUpdate(userID, {
                token
            }, { new: true });
            if(!infoUserAfterUpdated) 
                return resolve({ error: true, messsage: 'insert_user_fail'});
    
            return resolve({ error: false, data: infoUserAfterUpdated });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

module.exports.USER = {
    login,
    register
}



