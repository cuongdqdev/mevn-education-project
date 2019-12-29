const STUDENT_COLLECTION          = require('../database/student-coll');
const objectID                    = require('mongoose').Types.ObjectId

let insert = ({ fullname, classID, teacherID }) => {
    return new Promise(async resolve => {
        try {
            if(!fullname)
                return resolve({ error: true, messsage: 'invalid_params' });

            if(!objectID.isValid(teacherID) || !objectID.isValid(classID))
                return resolve({ error: true, messsage: 'invalid_object_id' });

            let infoStudent = new STUDENT_COLLECTION({ fullname, class: classID, teacher: teacherID });
            let infoStudentAfterInserted = await infoStudent.save();
            if(!infoStudentAfterInserted)
                return resolve({ error: true, messsage: 'insert_fail' });

            return resolve({ error: false, data: infoStudentAfterInserted });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let getByID = ({ studentID }) => {
    return new Promise(async resolve => {
        try {
            if(!objectID.isValid(studentID))
                return resolve({ error: true, messsage: 'invalid_object_id' });

            let infoStudent = await STUDENT_COLLECTION.findById(studentID);
            if(!infoStudent)
                return resolve({ error: true, messsage: 'get_info_fail' });

            return resolve({ error: false, data: infoStudent });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let getList = ({ }) => {
    return new Promise(async resolve => {
        try {
            let infoListStudent = await STUDENT_COLLECTION.find();
            if(!infoListStudent)
                return resolve({ error: true, messsage: 'get_list_fail' });

            return resolve({ error: false, data: infoListStudent });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let updateByID = ({ studentID, fullname, classID }) => {
    return new Promise(async resolve => {
        try {
            if(!objectID.isValid(classID) || !objectID.isValid(studentID))
                return resolve({ error: true, messsage: 'invalid_object_id' });

            if(!fullname)
                return resolve({ error: true, messsage: 'invalid_params' });

            let infoStudent = await STUDENT_COLLECTION.findByIdAndUpdate(studentID, {
                fullname, class: classID
            }, { new: true });
            if(!infoStudent)
                return resolve({ error: true, messsage: 'remove_fail' });

            return resolve({ error: false, data: infoStudent });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

let removeByID = ({ studentID }) => {
    return new Promise(async resolve => {
        try {
            if(!objectID.isValid(studentID))
                return resolve({ error: true, messsage: 'invalid_object_id' });

            let infoStudent = await STUDENT_COLLECTION.findByIdAndDelete(studentID);
            if(!infoStudent)
                return resolve({ error: true, messsage: 'remove_fail' });

            return resolve({ error: false, data: infoStudent });
        } catch (error) {
            return resolve({error: true, messsage: error.messsage});
        }
    });
}

module.exports.STUDENT = {
    insert,
    getByID,
    getList,
    removeByID,
    updateByID
}



