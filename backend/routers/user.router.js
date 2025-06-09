const express = require('express')
const {
    getAllUsers,
    adduser,
    updateUser,
    getUserById,
    deleteUser,
    login
} = require('./../controllers/user.controller.js')
const userRouter = express.Router()
userRouter.get("/",getAllUsers)
userRouter.post("/login",login)
userRouter.post("", adduser)
userRouter.put('/:id',updateUser)
userRouter.get("/:id",getUserById)
userRouter.delete('/:id',deleteUser)
module.exports = userRouter