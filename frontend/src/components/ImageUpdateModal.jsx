import React, { useState } from 'react'
import axios from 'axios'
import { API } from '../util/constants'

const StoreImageUpdateModal = ({ id }) => {
  const [StoreImage, setStoreImage] = useState(null)

  const handleStoreImageChange = (e) => {
    setStoreImage(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!StoreImage) return alert("Please select an StoreImage")

    const formData = new FormData()
    formData.append("StoreImage", StoreImage)

    try {
      await axios.put(`${API}/store/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("storeToken")}`,
        },
      })
      alert("Image updated successfully!")
    } catch (error) {
      console.error(error)
      alert("Failed to update image.")
    }
  }

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Upload the New StoreImage File</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="modalCloseBtn"></button>
          </div>
          <div className="modal-body">
            <input type="file" className="form-control" accept="StoreImage/*" onChange={handleStoreImageChange} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleUpload}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreImageUpdateModal