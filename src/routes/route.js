const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controller/userController')
const bookController = require('../controller/bookController')
const reviewController = require('../controller/reviewController')

//------------------ Auth Routes ------------------//
router.post('/register', authController.register)
router.post('/login', authController.login)

//------------------ Book Routes ------------------//
router.post('/createBook', authMiddleware, bookController.createBook)
router.get('/getAllBooks', bookController.getAllBooks)
router.get('/getBookById/:bookId', bookController.getBookById)

//------------------ Review Routes ------------------//
router.post('/createReview/:bookId',authMiddleware, reviewController.createReview)
router.get('/getReviewsByBook/:bookId', reviewController.getReviewsByBook)
router.put('/updateReview/:reviewId', authMiddleware, reviewController.updateReview)
router.delete('/deleteReview/:reviewId', authMiddleware, reviewController.deleteReview) 


module.exports = router