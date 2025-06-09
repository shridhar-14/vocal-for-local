import axios from 'axios'
import React,{useRef,useState} from 'react'
import {API} from '../util/constants'
import {useAuth} from '../context/AuthContext'
const AddStore=()=>{
    const [message,setMessage]=useState("")
    const [loading,setLoading]=useState(false)
    const {token}=useAuth()
    const StoreNameRef=useRef()
    const CategoryRef=useRef()
    const StoreImageRef=useRef()
    const ContactRef=useRef()
    const StoreLocalityRef=useRef()
    const StoreCityRef=useRef()
    const StoreStateRef=useRef()
    const StorePinRef=useRef()
    const WorkingHourRef=useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
      
        let StoreName = StoreNameRef.current.value;
        let Category = CategoryRef.current.value;
        let Contact=ContactRef.current.value;
        let StoreLocality = StoreLocalityRef.current.value;
        let StoreCity = StoreCityRef.current.value;
        let StoreState = StoreStateRef.current.value;
        let StorePin=StorePinRef.current.value;
        let WorkingHour=WorkingHourRef.current.value;
        let StoreImage = StoreImageRef.current.files[0];
      
        const storeData = new FormData();
        storeData.append("StoreName", StoreName);
        storeData.append("Category", Category);
        storeData.append("Contact", Contact);
        storeData.append("StoreLocality", StoreLocality);
        storeData.append("StoreCity", StoreCity);
        storeData.append("StoreState", StoreState);
        storeData.append("StorePin", StorePin);
        storeData.append("WorkingHour", WorkingHour);
        storeData.append("StoreImage",StoreImage);
      
        try{
          let data = await axios.post(`${API}/store`, storeData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(data);
          setMessage("Store Added");
      
          StoreNameRef.current.value = "";
          CategoryRef.current.value = "";
          ContactRef.current.value = "";
          StoreLocalityRef.current.value = "";
          StoreCityRef.current.value = "";
          StoreStateRef.current.value = "";
          StorePinRef.current.value = "";
          WorkingHourRef.current.value = "";
          StoreImageRef.current.value = null;
        } catch (error) {
          console.log(error);
          setMessage("store not added");
        }
      
        setLoading(false);
      };
  return (
<div className='row' style={{ paddingTop: '40px', fontFamily: 'Arial, sans-serif' }}>
  <div className="col-md-6 mx-auto">
    <div className="card shadow" style={{ border: 'none', borderRadius: '10px', overflow: 'hidden' }}>
      <div className="card-header bg-primary text-white" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '22px', marginBottom: '5px' }}>Add Store</h3>
        <p style={{ margin: 0 }}>{message}</p>
      </div>
      <div className="card-body" style={{ backgroundColor: '#fdfdfd', padding: '20px' }}>
        <form method="post" onSubmit={handleSubmit}>
          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store Name</label>
          <input ref={StoreNameRef} type='text' required className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Category</label>
          <select ref={CategoryRef} className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }}>
            <option value="">--Select---</option>
            <option value="FOOD">FOOD</option>
            <option value="GROOMING">GROOMING</option>
            <option value="FASHION">FASHION</option>
            <option value="ENTERTAINMENT">ENTERTAINMENT</option>
            <option value="GROCERIES">GROCERIES</option>
          </select>

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Contact</label>
          <input ref={ContactRef} type='text' className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store Locality</label>
          <input ref={StoreLocalityRef} type='text' className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store City</label>
          <input ref={StoreCityRef} type='text' className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store State</label>
          <input ref={StoreStateRef} type='text' className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Store Pin</label>
          <input ref={StorePinRef} type='text' className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Working Hour</label>
          <input ref={WorkingHourRef} type='text' className='form-control mb-3'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>Item Image</label>
          <input ref={StoreImageRef} type='file' className='form-control mb-4'
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }} />

          {!loading && (
            <input type='submit' value="Add Store"
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

export default AddStore