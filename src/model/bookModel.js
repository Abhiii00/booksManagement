const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        require: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    authorName: {
        type: String,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

module.exports = mongoose.model("Books", bookSchema);