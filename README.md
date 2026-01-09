# booksManagement

API ----------------

Auth Api ---------------------------------
 
http://localhost:3000/api/register

{
    "name": "Pankaj",
    "email": "pankaj@gmail.com",
    "password": "abhay123#"
}
 
http://localhost:3000/api/login

{
    "email": "pankaj@gmail.com",
    "password": "abhay123#"
}

Books -----------------------------------------------

http://localhost:3000/api/createBook

{
    "bookName": "Dark Night 1",
    "authorName": "Will 2",
    "type": "Sci Fi 2"
}

http://localhost:3000/api/getAllBooks

http://localhost:3000/api/getBookById/:bookId

Reviews -----------------------------------------------------

http://localhost:3000/api/createReview/:bookId

{
    "rating": 3,
    "comment": "nice to read"
}

http://localhost:3000/api/getReviews/:bookId

http://localhost:3000/api/deleteReview/:reviewId

http://localhost:3000/api/updateReview/:reviewId

{
    "rating": 3,
    "comment": "nice to read"
}


