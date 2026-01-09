const reviewModel = require("../model/reviewModel");

exports.createReview = async (req, res) => {
    try {
        const data = req.body;  
        data.userId = req.user.id;
        const bookId = req.params.bookId;
        data.bookId = bookId;

        if(!data.rating) return res.status(400).send({ success: false, message: "Rating is required" });

        if(!data.comment) return res.status(400).send({ success: false, message: "Comment is required" });

        const review = await reviewModel.create(data);
        return res.status(201).send({ success: true, message: "Review created successfully", data: review });   

    } catch (err) {
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};  

exports.getReviewsByBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const reviews = await reviewModel.find({ bookId: bookId, isDeleted: false });   
        if(!reviews || reviews.length === 0){
            return res.status(404).send({ success: false, message: "No reviews found for this book" });
        }
        return res.status(200).send({ success: true, message: "Reviews fetched successfully", data: reviews });
    } catch (err) {
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};  

exports.updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const data = req.body;
        
        if (!reviewId) return res.status(400).send({ success: false, message: "Review ID is required" });

        const review = await reviewModel.findOneAndUpdate({ _id: reviewId, isDeleted: false }, data, { new: true });
        if (!review) return res.status(404).send({ success: false, message: "Review not found" });

        return res.status(200).send({ success: true, message: "Review updated successfully", data: review });
    } catch (err) {
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};  

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        if (!reviewId) return res.status(400).send({ success: false, message: "Review ID is required" });

        const review = await reviewModel.findOneAndUpdate({ _id: reviewId, isDeleted: false }, { isDeleted: true }, { new: true }); 
        if (!review) return res.status(404).send({ success: false, message: "Review not found" });

        return res.status(200).send({ success: true, message: "Review deleted successfully" });
    } catch (err) {
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};      

