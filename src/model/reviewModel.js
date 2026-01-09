const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

module.exports = mongoose.model("review", reviewSchema);