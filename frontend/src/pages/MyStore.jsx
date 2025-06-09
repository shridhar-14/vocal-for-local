import { useState, useEffect } from 'react'
import axios from 'axios'
import StoreCard from '../components/StoreCard'
import { API } from '../util/constants'
import { useAuth } from '../context/AuthContext'

const MyStore = () => {
    const { token } = useAuth()
    const [ stores, setStores ] = useState([])
    const getStores = async() => {
        try {
            let data = await axios.get(`${API}/store/owner`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log(data.data);
            setStores(data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getStores()
    }, [])
  return (
    <div className='row g-2'>
        {
            stores.map(store => (
                <div className="col-md-4" key={store._id}>
                    <StoreCard store={store} />
                </div>
            ))
        }
    </div>
  )
}

export default MyStore