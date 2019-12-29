const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

let userSchema = new Schema({ 
    username: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String,
        default: 'avatar.png'
    },
    /**
     * Quyền
     * 0. Quản trị viên
     * 1. Giáo viên
     * 2. Học sinh
     */
    role: {
        type: Number,
        default: 0
    },
    /**
     * Trạng thái
     * 0. Khóa
     * 1. Hoạt động
     */
    status: {
        type: Number,
        default: 1
    },
    /**
     * Số lần đăng nhập sai
     * 5. Khóa account
     */
    attempLogin: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema);