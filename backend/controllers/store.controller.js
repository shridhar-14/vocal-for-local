const { default:mongoose } = require('mongoose')
const Store = require('./../models/store.model.js')
const Review=require('./../models/review.model.js')
const addStore = async (req, res) => {
    try {
        let store = req.body
        let fileName = req.file.filename
        store.StoreImage = fileName
        console.log(store)
        store.owner=req.user.id
        store = await Store.create(store)
        res.status(201).send(store)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
// Get all stores
const allStore = async (req, res) => {
    try {
        const stores = await Store.find().populate("owner");

        const modStore = await Promise.all(stores.map(async (store) => {
            const reviews = await Review.find({ store: store._id }).populate("reviewBy");

            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : null;

            return {
                ...store.toObject(),
                StoreImage: "http://localhost:5000/uploads/" + store.StoreImage,
                averageRating: avgRating,
                reviews: reviews.map(review => ({
                    rating: review.rating,
                    review: review.review,
                    reviewBy: review.reviewBy,
                }))
            };
        }));

        res.status(200).send(modStore);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
// Get store by ID  average rating
const getStoreById = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findOne({ _id: id }).populate("owner");

        if (!store) {
            return res.status(404).send({ message: "Invalid store ID" });
        }

        const reviews = await Review.find({ store: store._id }).populate("reviewBy");

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : null;

        const modStore = {
            ...store.toObject(),
            StoreImage: "http://localhost:5000/uploads/" + store.StoreImage,
            averageRating: avgRating,
            reviews: reviews.map(review => ({
                rating: review.rating,
                review: review.review,
                reviewBy: review.reviewBy,
            }))
        };

        res.send(modStore);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const updateDetailsById=async(req,res)=>{
    try{
        // let store=req.body;
        let {id}=req.params;
        let existingStore=await Store.findById(id);
        if(existingStore){
            if(existingStore.owner.toString()!==req.user.id){
                return res.status(401).send({message:"You are not authorized to update this store"})
            }
        }else{
            return res.status(404).send({message:"Invalid Store Id"})
        }
        let store=req.body
        store=await Store.findOneAndUpdate({_id:id},store,{new:true}).populate("owner","-password");
        let modStore={
                ...store.toObject(),
                StoreImage:process.env.IMAGE_URL+store.StoreImage
            }
            res.status(200).send(modStore)
    }catch(error){
        res.status(400).send({"message": error.message});
    }
}
//store by a particular user
const myStore = async(req, res)=> {
    try {
        let ownerId = req.user.id
        ownerId = new mongoose.Types.ObjectId(ownerId)
        let stores = await Store.find({owner: ownerId}).populate("owner", "-password")
        let modStores = stores.map( store => (
            {
                ...store.toObject(),
                StoreImage: process.env.IMAGE_URL+store.StoreImage
            }
        ))
        res.status(200).send(modStores)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
// Search store by location average rating
const searchLocation = async (req, res) => {
    try {
        const { key } = req.params;
        const stores = await Store.find({
            $or: [
                { StoreLocality: key },
                { StoreCity: key },
                { StoreState: key }
            ]
        }).populate("owner");

        if (!stores || stores.length === 0) {
            return res.status(404).send({ message: "No stores found for the given location." });
        }

        const modStore = await Promise.all(stores.map(async (store) => {
            const reviews = await Review.find({ store: store._id }).populate("reviewBy");

            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : null;

            return {
                ...store.toObject(),
                StoreImage: "http://localhost:5000/uploads/" + store.StoreImage,
                averageRating: avgRating,
                reviews: reviews.map(review => ({
                    rating: review.rating,
                    review: review.review,
                    reviewBy: review.reviewBy,
                }))
            };
        }));

        res.send(modStore);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const updateStoreImage = async (req, res) => {
    try {
        let { id } = req.params
        let fileName = req.file.filename
        let store = await Store.findOneAndUpdate({_id: id}, {"StoreImage": fileName}, {new: true})
        res.status(200).send(store)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
// Search stores by category average rating
const searchByCategory = async (req, res) => {
    try {
        const { key } = req.params;

        const stores = await Store.find({
            Category: { $regex: key, $options: 'i' }
        }).populate("owner");

        const modStore = await Promise.all(stores.map(async (store) => {
            const reviews = await Review.find({ store: store._id }).populate("reviewBy");

            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : null;

            return {
                ...store.toObject(),
                StoreImage: "http://localhost:5000/uploads/" + store.StoreImage,
                averageRating: avgRating,
                reviews: reviews.map(review => ({
                    rating: review.rating,
                    review: review.review,
                    reviewBy: review.reviewBy,
                }))
            };
        }));

        res.send(modStore);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const fs=require('fs');
const path=require('path');
const deleteStore=async(req, res)=>{
    try{
        let { id } = req.params
        let existingStore=await Store.findById(id);
        // console.log(event) 
        if(existingStore){
            if(existingStore.owner.toString()!==req.user.id){
                return res.status(401).send({message:"You are not authorized to update this event."})
            }
        }else{
            return res.status(404).send({message:"Invalid Store Id"})
        }
        const imagePath=path.join(__dirname,'..','uploads',existingStore.StoreImage);
        let store = await Store.findOneAndDelete({_id: id})
        if(store){
            fs.unlink(imagePath,(err)=>{
                if(err){
                    console.log("Failed to delete",err.message);
                }
            });
            res.status(200).send(store)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
module.exports = {
    addStore,
    allStore,
    getStoreById,
    updateDetailsById,
    searchByCategory,
    searchLocation,
    deleteStore,
    updateStoreImage,
    myStore
}