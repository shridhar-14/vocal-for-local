const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    review: {
        type: String,
        required: true
    },
    reviewBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
        required: true
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
