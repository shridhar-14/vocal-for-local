//PUNYASHREE DAS-22BCSH93 
import axios from 'axios';
import {useRef,useState,useEffect} from 'react'
import StoreCard from '../components/StoreCard';
import {API} from '../util/constants';
const Searchcat=()=>{
    const searchRef=useRef()
    const [stores,setStores]=useState([])
    const [error,setError]=useState("")
    const getStore = async() => {
        try {
            let data = await axios.get(`${API}/store`)
            console.log(data.data);
            setStores(data.data)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{ 
        getStore()
    }, [])
    const handleSubmit=async(e)=>{
        setError("")
        e.preventDefault();
        let key=searchRef.current.value
        console.log(key)
        try{
            let data=await axios.get(`${API}/store/find/${key}`)
            setStores(data.data)
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
                                <input ref={searchRef} className='form-control' type="text" placeholder='Search By Category' required/>
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
                    <p className='text-danger'>NO ITEM FOUND</p>
                ):(
                    stores.map(store => (
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
export default Searchcat