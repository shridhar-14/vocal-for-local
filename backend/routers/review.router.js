const express = require('express')
const verifyToken=require('../middlewares/auth.middleware.js')
const {
    addReview,
    updateReview,
    deleteReview,
    getReviewStore,
} = require('./../controllers/review.controller.js')
const reviewRouter = express.Router()
//reviewRouter.get("/",getAllUsers)
// reviewRouter.post("",verifyToken, addReview)
reviewRouter.post("/add/:id",verifyToken, addReview)
reviewRouter.put('/:id',updateReview)
reviewRouter.get("/store/:id", getReviewStore)
reviewRouter.delete('/delete/:id',deleteReview)

module.exports = reviewRouter