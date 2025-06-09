// PUNYASHREE DAS-22BCSH93
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { API } from '../util/constants'

const SignUp = () => {

    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const nameRaf = useRef()
    const mobileRaf = useRef()
    const emailRaf = useRef()
    const passwordRaf = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let name = nameRaf.current.value
        let mobile = mobileRaf.current.value
        let email = emailRaf.current.value
        let password = passwordRaf.current.value

        try {
            let user = await axios.post(`${API}/users`, {name, mobile, email, password})
            setMessage("Account Created")
            nameRaf.current.value = ""
            mobileRaf.current.value = ""
            emailRaf.current.value = ""
            passwordRaf.current.value = ""
        } catch (error) {
            if(error.status == 400){
                setMessage("Check email and mobile, and try again")
            } else {
                setMessage("Something Wrong")
            }
        }
        setLoading(false)
    }

  return (
    <div className='row' style={{ paddingTop: '40px', fontFamily: 'Arial, sans-serif' }}>
    <div className="col-md-6 mx-auto">
      <div className="card shadow" style={{ border: 'none', borderRadius: '10px', overflow: 'hidden' }}>
        <div className="card-header bg-primary text-white" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '5px' }}>Create an Account</h3>
          <p style={{ margin: 0 }}>{message}</p>
        </div>
        <div className="card-body" style={{ backgroundColor: '#fdfdfd', padding: '20px' }}>
          <form method="post" onSubmit={handleSubmit}>
            <input
              ref={nameRaf}
              type='text'
              className='form-control mb-3'
              placeholder='Name'
              required
              style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }}
            />
            <input
              ref={mobileRaf}
              type='text'
              className='form-control mb-3'
              placeholder='Mobile'
              required
              style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }}
            />
            <input
              ref={emailRaf}
              type='email'
              className='form-control mb-3'
              placeholder='Email'
              required
              style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }}
            />
            <input
              ref={passwordRaf}
              type='password'
              className='form-control mb-4'
              placeholder='Password'
              required
              style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }}
            />
            {!loading && (
              <input
                type='submit'
                value="Sign Up"
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

export default SignUp