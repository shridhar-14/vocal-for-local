// PUNYASHREE DAS-22BCSH93
import axios from 'axios'
import React, { useState } from 'react'
import { API } from '../util/constants'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")
        try {
            console.log(email, password)
            let data = await axios.post(`${API}/users/login`, {email, password})
            console.log(data)
            login(data.data)
            setEmail("")
            setPassword("")
            navigate("/")
        } catch (error) {
            setMessage("Invalid Credentials")
        }
        setLoading(false)
    }

    return (
        <div className="row" style={{ paddingTop: '40px', fontFamily: 'Arial, sans-serif' }}>
  <div className="col-md-6 mx-auto">
    <div className="card shadow" style={{ border: 'none', borderRadius: '10px', overflow: 'hidden' }}>
      <div className="card-header bg-primary text-white" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '22px', marginBottom: '5px' }}>Login In Here</h3>
        <p style={{ margin: 0 }}>{message}</p>
      </div>
      <div className="card-body" style={{ backgroundColor: '#fdfdfd', padding: '20px' }}>
        <form method="post" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }}
          />
          <input
            type="password"
            className="form-control mb-4"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ borderRadius: '6px', border: '1px solid #ccc', padding: '8px 10px' }}
          />
          {!loading && (
            <input
              type="submit"
              value="Sign In"
              className="btn btn-primary w-100"
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

export default SignIn
