import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate,Link } from 'react-router-dom'
import { API } from '../util/constants'
import { getUserIdFromToken } from '../util/helperFunctions'
import ImageUpdateModal from '../components/ImageUpdateModal'
const StoreDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [store, setStore] = useState({})
    const isOwner=store?.owner?._id?.toString()==getUserIdFromToken();
    const getStoreDetails = async () => {
        try {
            let storeRes = await axios.get(`${API}/store/${id}`)
            setStore(storeRes.data)
        } catch (error) {
            console.log(error)
            if(error.status===400){
                alert("Failed to fetch store details.")
            }
            navigate("/")
        }
    }
    useEffect(() => {
        getStoreDetails()
    }, [id])
    const handleDelete =async()=>{
        if (!window.confirm("Are you sure you want to delete this Store?")) return;
        try {
            await axios.delete(`${API}/store/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("storeToken")}`,
                },
            });
            alert("Store deleted successfully.");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Failed to delete the store.");
        }
    };
    return (
        <>
            <div className='row g-3'>
                <div className="col-md-6">
                    <img src={store.StoreImage} className='img-fluid w-100' alt="Store" />
                    {
                        isOwner && (
                            <p className='mt-2'>
                                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Update Image
                                </button>
                            </p>
                        )
                    }
                </div>
                <div className="col-md-6" style={{fontFamily:"cursive", color:"blue"}}>
                    <h3>{store.StoreName}</h3>
                    {store.averageRating && (
                        <p className="text-warning mb-1">
                            <strong>Average Rating:</strong> {store.averageRating} ⭐
                        </p>
                    )}
                    <p>{store.description}</p>
                    <p className="my-0">
                        <span className="fw-semibold">Contact Us: </span>{store.Contact}
                    </p>
                    <p className="my-0">
                        <span className="fw-semibold">Category: </span>{store.Category}
                    </p>
                    <p className="my-0">
                        <span className="fw-semibold">Location: </span>{store.StoreLocality}, {store.StoreCity}, {store.StoreState}
                    </p>
                    <p className="my-0">
                        <span className="fw-semibold">Pin: </span>{store.StorePin}
                    </p>

                    {/* Reviews Section */}
                    <div className="card mt-3 border-dark">
                        <div className="card-body">
                            <p className="lead fw-bold">Reviews & Rating</p>
                            {store.reviews && store.reviews.length > 0 ? (
                                store.reviews.map((review, index) => (
                                    <div key={index} className="border-bottom mb-2 pb-2">
                                        <p className="mb-1">
                                            <strong>Rating:</strong> {review.rating}⭐
                                        </p>
                                        <p className="mb-1 text-success">
                                            <strong>Review:</strong> {review.review}
                                        </p>
                                        {review.reviewBy && (
                                            <p className="mb-1 text-danger">
                                                <strong>By: {review.reviewBy.name}</strong>
                                            </p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p style={{ fontWeight: 'bold', color: 'red' }}>No reviews available.</p>
                            )}
                            {
                            !isOwner && (
                                <Link to={`/review/${store._id}`} className="btn btn-sm btn-warning">Add Review & Rating</Link> 
                            )
                            }
                        </div>
                    </div>
                    {/* Owner Details */}
                    <div className="card mt-3 border-dark">
                        <div className="card-body">
                            <p className="lead fw-bold">Owner Details</p>
                            <span className='d-block fw-semibold'>{store?.owner?.name}</span>
                            <span className='d-block'>{store?.owner?.mobile}</span>
                        </div>
                        {
                        isOwner && (
                            <div className="card-footer">
                                <Link to={`/update/${store._id}`} className="btn btn-sm btn-info">Update</Link> 
                                <button className='btn btn-sm btn-danger ms-2' onClick={handleDelete}>Delete</button>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
            {isOwner && <ImageUpdateModal id={id}/>}
        </>
    )}
export default StoreDetails