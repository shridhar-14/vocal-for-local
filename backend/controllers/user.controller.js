const jwt=require('jsonwebtoken')
const User = require('./../models/user.model.js')
async function getAllUsers(req, res){
    try {
        let users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
async function adduser(req, res){
    try{
        let newUser = req.body
        // console.log(newUser)
        let user = await User.create(newUser)
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
async function getUserById(req, res){
    try {
        let { id } = req.params
        let users = await User.findOne({_id: id})
        if(users){
            res.send(users)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
async function updateUser(req,res){
    try{
        let user = req.body
        let { id } = req.params
        console.log(user)
        user = await User.findOneAndUpdate({_id: id}, user, {new: true})
        if(user){
            res.status(200).send(user)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
async function login(req,res){
    try{
        let{email,password}=req.body
        let user=await User.findOne({email})
        if(user){
            if(user.password == password){
                let token=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET)
                res.status(200).send({token:token,name:user.name})
            }else{
                res.status(400).send({message:"Invalid Credentials"})
            }
        }else{
            res.status(400).send({message:"Invalid Credentials"})
        }
    }catch(error){
        res.status(500).send({message:"Server Error"})
    }
}
async function deleteUser(req,res){
    try{
        let { id } = req.params
        let user = await User.findOneAndDelete({_id: id})
        if(user){
            res.status(200).send(user)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
module.exports = {
    getAllUsers,
    adduser,
    updateUser,
    getUserById,
    deleteUser,
    login
}