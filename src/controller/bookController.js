const bookModel = require("../model/bookModel");
const reviewModel = require("../model/reviewModel");
const userModel = require("../model/userModel");

exports.createBook = async (req, res) => {
    try {
        const data = req.body;
        data.userId = req.user.id; 

        if(!data.bookName) return res.status(400).send({ success: false, message: "Book name is required" });

        if(!data.authorName) return res.status(400).send({ success: false, message: "Author name is required" });
        
        if(!data.type) return res.status(400).send({ success: false, message: "Book type is required" });
        
        const book = await bookModel.create(data);
        return res.status(201).send({ success: true, message: "Book created successfully", data: book });
    } catch (err) {
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};  

exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find({ isDeleted: false });   
        if(!books || books.length === 0){
            return res.status(404).send({ success: false, message: "No books found" });
        }
        return res.status(200).send({ success: true, message: "Books fetched successfully", data: books });
    } catch (err) {
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};  

exports.getBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        if (!bookId) return res.status(400).send({ success: false, message: "Book ID is required" });

        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!book) return res.status(404).send({ success: false, message: "Book not found" });   
           
        const reviews = await reviewModel.find({ bookId: bookId, isDeleted: false });
        return res.status(200).send({ success: true, message: "Book details fetched successfully", data: { book, reviews } });
    } catch (err) {
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};
