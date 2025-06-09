const {mongoose}=require('mongoose')
const Review=require('./../models/review.model')
const Store=require('./../models/store.model')
const addReview = async (req, res) => {
    try {
        const newReview = {
            review: req.body.review,
            rating: req.body.rating,
            reviewBy: req.user.id,
            store: req.params.id
        }

        const review = await Review.create(newReview)

        await Store.findByIdAndUpdate(req.params.id, {
            $push: { reviews: review._id }
        })

        res.status(201).json(review)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: "Failed to add review." })
    }
}

const updateReview = async (req, res) => {
    try {
        let review = req.body
        let { id } = req.params
        console.log(review)
        review = await Review.findOneAndUpdate({_id: id}, review, {new: true})
        if(review) {
            res.status(200).send(review)
        }
        else {
            res.status(404).send({"message": "Invalid id"})
        } 
    } catch (error){
        res.status(400).send({"message": error.message})
    }
}

const getReviewStore=async(req,res)=>{
    try{
        let { id }=req.params
        console.log(id);
        id= new mongoose.Types.ObjectId(id)
        let reviews=null;
        reviews=await Review.find({"store": id})
        let modReview=reviews.map(review =>(
        {
            ...review.toObject(),
        }
        ))
        res.status(200).send(modReview)
        } catch(error) {
            res.status(400).send({"message": error.message})
        }
}
async function deleteReview(req,res){
    try{
        let { id } = req.params
        let review = await Review.findOneAndDelete({_id: id})
        if(review){
            res.status(200).send(review)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
module.exports={
    addReview,
    updateReview,
    getReviewStore,
    deleteReview
}