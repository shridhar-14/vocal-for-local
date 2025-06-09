import axios from 'axios';
import {useRef,useState} from 'react'
import {API} from '../util/constants';
import StoreCard from '../components/StoreCard';
const Search=()=>{
    const searchRef=useRef()
    const [Store,setStore]=useState([])
    const [error,setError]=useState("")
    const handleSubmit=async(e)=>{
        setError("")
        e.preventDefault();
        let key=searchRef.current.value
        console.log(key)
        try{
            let data=await axios.get(`${API}/store/search/${key}`)
            setStore(data.data)
        }catch(error){
            console.log(error)
            setError("No Item Found")
        }
    }
    return(
        <>
            <div className='row'>
                <div className="col-md-6-mx-auto">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="row g-1">
                            <div className="col-10">
                                <input ref={searchRef} className='form-control' type="text" placeholder='Search' required/>
                            </div>
                            <div className="col-2">
                                <input className='btn btn-primary' type='submit' value="Search"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row g-2 mt-4'>
            {
                error.length>0?(
                    <h2 className='text-danger'>No Store Found</h2>
                ):(
                    Store.map(store => (
                        <div className="col-md-4" key={store._id}>
                            <StoreCard store={store}/>
                        </div>
                    ))
                )
            }
            </div>
        </>

    )
}
export default Search