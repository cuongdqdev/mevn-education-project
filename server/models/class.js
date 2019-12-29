const CLASS_COLLECTION            = require('../database/class-coll');
const objectID                    = require('mongoose').Types.ObjectId

let insert = ({ name, description, teacherID }) => {
    return new Promise(async resolve => {
        try {
            if(!name)
                return resolve({ error: true, messsage: 'invalid_params' });

            if(!objectID.isValid(teacherID))
                return resolve({ error: true, messsage: 'invalid_object_id' });

            let infoClass = new CLASS_COLLECTION({ name, description, teacher: teacherID });
            let infoClassAfterInserted = await infoClass.save();
            if(!infoClassAfterInserted)
                return resolve({ error: true, messsage: 'insert_fail' });

            return resolve({ error: false, data: infoClassAfterInserted });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let getByID = ({ classID }) => {
    return new Promise(async resolve => {
        try {
            if(!objectID.isValid(classID))
                return resolve({ error: true, messsage: 'invalid_object_id' });

            let infoClass = await CLASS_COLLECTION.findById(classID);
            if(!infoClass)
                return resolve({ error: true, messsage: 'get_info_fail' });

            return resolve({ error: false, data: infoClass });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let getList = ({ }) => {
    return new Promise(async resolve => {
        try {
            let infoListClass = await CLASS_COLLECTION.find();
            if(!infoListClass)
                return resolve({ error: true, messsage: 'get_list_fail' });

            return resolve({ error: false, data: infoListClass });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let updateByID = ({ classID, name, description }) => {
    return new Promise(async resolve => {
        try {
            if(!objectID.isValid(classID))
                return resolve({ error: true, messsage: 'invalid_object_id' });

            if(!name)
                return resolve({ error: true, messsage: 'invalid_params' });

            let infoClass = await CLASS_COLLECTION.findByIdAndUpdate(classID, {
                name, description
            }, { new: true });
            if(!infoClass)
                return resolve({ error: true, messsage: 'remove_fail' });

            return resolve({ error: false, data: infoClass });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let removeByID = ({ classID }) => {
    return new Promise(async resolve => {
        try {
            if(!objectID.isValid(classID))
                return resolve({ error: true, messsage: 'invalid_object_id' });

            let infoClass = await CLASS_COLLECTION.findByIdAndDelete(classID);
            if(!infoClass)
                return resolve({ error: true, messsage: 'remove_fail' });

            return resolve({ error: false, data: infoClass });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

module.exports.CLASS = {
    insert,
    getByID,
    getList,
    removeByID,
    updateByID
}



