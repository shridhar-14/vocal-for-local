// PUNYASHREE DAS-22BCSH93
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../util/constants'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateStore = () => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const { token } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()
    const [ store, setStore ] = useState({})

    const StoreNameRef = useRef()
    const CategoryRef = useRef()
    const StoreLocalityRef = useRef()
    const StoreCityRef=useRef()
    const StoreStateRef=useRef()
    const StoreWorkingHourRef=useRef()
    const StorePinRef=useRef()

    const getStoreDetails = async() => {
        try {
            let data = await axios.get(`${API}/store/${id}`)
            setStore(data.data)
            let store = data.data
            StoreNameRef.current.value = store.StoreName
            CategoryRef.current.value = store.Category
            StoreLocalityRef.current.value = store.StoreLocality
            StoreCityRef.current.value=store.StoreCity
            StoreStateRef.current.value=store.StoreState
            StoreWorkingHourRef.current.value=store.WorkingHour
            StorePinRef.current.value=store.StorePin
        } catch (error) {
            console.log(error);
            if(error.storeLocality === 400){
                alert("Invalid Id")
            }
            navigate("/")
        }
    }

    useEffect(()=>{
        getStoreDetails()
    }, [id])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("")
        setLoading(true)

        let StoreName = StoreNameRef.current.value
        let Category = CategoryRef.current.value
        let StoreLocality = StoreLocalityRef.current.value
        let StoreCity=StoreCityRef.current.value
        let StoreState=StoreStateRef.current.value
        let WorkingHour=StoreWorkingHourRef.current.value
        let StorePin=StorePinRef.current.value
        let storeData = {StoreName, Category, StoreLocality, StoreCity, StoreState, WorkingHour, StorePin}

        // console.log(eventData)
        try{
            let data = await axios.put(`${API}/store/store/${id}`, storeData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            console.log(data)
            setMessage("store Updated")
        } catch(error){
            console.log(error)
            setMessage("store not updated")
        }
        setLoading(false)
    }

  return (
    <div className='row' style={{ paddingTop: '40px', fontFamily: 'Arial, sans-serif' }}>
  <div className="col-md-6 mx-auto">
    <div className="card shadow" style={{ border: 'none', borderRadius: '10px', overflow: 'hidden' }}>
      <div className="card-header bg-primary text-white" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '22px', marginBottom: '5px' }}>Update Store</h3>
        <p style={{ margin: 0 }}>{message}</p>
      </div>
      <div className="card-body" style={{ backgroundColor: '#fdfdfd', padding: '20px' }}>
        <form method="post" onSubmit={handleSubmit}>
          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store Name</label>
          <input ref={StoreNameRef} type='text' required className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Category</label>
          <select ref={CategoryRef} required className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }}>
            <option value="">--Select---</option>
            <option value="FOOD">FOOD</option>
            <option value="GROOMING">GROOMING</option>
            <option value="ENTERTAINMENT">ENTERTAINMENT</option>
            <option value="FASHION">FASHION</option>
            <option value="GROCERIES">GROCERIES</option>
          </select>

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store Locality</label>
          <input ref={StoreLocalityRef} type='text' required className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store City</label>
          <input ref={StoreCityRef} type='text' required className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store State</label>
          <input ref={StoreStateRef} type='text' required className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Working Hour</label>
          <input ref={StoreWorkingHourRef} type='text' required className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store Pin</label>
          <input ref={StorePinRef} type='text' required className='form-control mb-4'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          {!loading && (
            <input type='submit' value="Update Store"
              className='btn btn-primary w-100'
              style={{ fontWeight: 'bold', padding: '10px', fontSize: '16px', borderRadius: '8px' }}
            />
          )}
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default UpdateStore