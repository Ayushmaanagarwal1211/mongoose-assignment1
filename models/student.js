const mongoose = require('mongoose');
const gradeSchema = mongoose.Schema({
    course: String,
    score: Number,
    maxScore: Number,
    date: {
        type: Date,
        default: Date.now,
    },
});

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gpa: {
        type: Number,
        default: 3,
    },
    courses: {
        type: [String],
        default: ["Math"]
    },
    age: Number,
    grades: {
        type: [gradeSchema],
        default: [],
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    }
});

module.exports = mongoose.model('Student', StudentSchema);
