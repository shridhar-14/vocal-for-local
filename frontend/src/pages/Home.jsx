import { useState, useEffect } from 'react'
import axios from 'axios'
import StoreCard from '../components/StoreCard'
import { API } from '../util/constants'

const Home = () => {
    const [ store, setStore ] = useState([])
    const getStore = async() => {
        try {
            let data = await axios.get(`${API}/store`)
            console.log(data.data);
            setStore(data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{ 
        getStore()
    }, [])
    if(store.length === 0) {
        return (
            <div class="d-flex align-items-center">
                <strong>Loading...</strong>
                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
        )
    }
  return (
    <div className='row g-2'>
        {
            store.map(s => (
                <div className="col-md-4" key={s._id}>
                    <StoreCard store={s} />
                </div>
            ))
        }
    </div>
  )
}

export default Home