const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const studentSchema = new Schema({
    fullname: {
        type: String
    },
    /**
     * Lớp học
     */
    class: {
        type: Schema.Types.ObjectId,
        ref: 'class'
    },
    /**
     * Giáo viên dạy
     */
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('student', studentSchema);
