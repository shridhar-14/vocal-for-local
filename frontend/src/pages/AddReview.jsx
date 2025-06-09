import axios from 'axios'
import React, { useRef, useState } from 'react'
import { API } from '../util/constants'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

const AddReview = () => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const { token } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()

    const RatingRef = useRef()
    const ReviewRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)

        const reviewData = {
            rating: RatingRef.current.value,
            review: ReviewRef.current.value
        }

        try {
            await axios.post(`${API}/review/add/${id}`, reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMessage("Review added successfully.")
            navigate(`/${id}`)
        } catch (error) {
            console.error(error)
            setMessage("Failed to add review.")
        }

        setLoading(false)
    }

    return (
        <div className='row' style={{ marginTop: '40px' }}>
    <div className="col-md-6 mx-auto">
        <div className="card shadow" style={{ border: '1px solid #dee2e6', borderRadius: '10px' }}>
            <div className="card-header text-center bg-light">
                <h3 style={{ fontWeight: 'bold' }}>Add Review</h3>
                <p>{message}</p>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <label style={{ fontWeight: 'bold' }}>Review</label>
                    <input
                        ref={ReviewRef}
                        type='text'
                        className='form-control mb-3'
                        required
                        style={{ padding: '10px', borderRadius: '6px' }}
                    />
                    <label style={{ fontWeight: 'bold' }}>Rating</label>
                    <select
                        ref={RatingRef}
                        className='form-control mb-3'
                        required
                        style={{ padding: '10px', borderRadius: '6px' }}
                    >
                        <option value="">--Select--</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                    <input
                        type='submit'
                        value="Submit Review"
                        className='btn btn-primary w-100'
                        disabled={loading}
                        style={{ padding: '10px', fontWeight: 'bold' }}
                    />
                </form>
            </div>
        </div>
    </div>
</div>

    )
}

export default AddReview
