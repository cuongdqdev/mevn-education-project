const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    /**
     * Giáo viên tạo lớp học (author)
     */
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'student'
    }],
    numberOfStudent: {
        type: Number,
        default: 0
    },
    /**
     * Ảnh bìa của lớp học
     */
    coverImage: {
        type: String,
        default: 'cover_class.png'
    }

})

module.exports = mongoose.model('class', classSchema);
