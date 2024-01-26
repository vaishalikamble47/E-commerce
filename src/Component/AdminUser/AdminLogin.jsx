import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { loginAdminAsync } from '../../Redux-rtk/Slice/AdminSlice/AdminUserSlice'
import "./Admin.css"
const AdminLogin = ({ checkAdminuser }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [emailError, setEmailError] = useState()
  const [passwordError, setpasswordError] = useState()
  const [showErr,setShowErr]=useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const adminSignin = async (e) => {
    if (!email) {
      setEmailError("Enter Valid Email")
    }
    if (!password) {
      setpasswordError("Enter Password")
    }
    e.preventDefault()
    const data = { email, password };
    if(email && password){
     try {
      const result = await dispatch(loginAdminAsync(data))
      let admindata = result.payload.data[0]
      delete admindata.password
      localStorage.setItem("user", JSON.stringify(admindata))
      checkAdminuser()
      navigate('/')
     } catch (error) {
      setShowErr("Invalid Credential")
     }
    }
  }


  return (
    <div>
      <div className='L-login'>
        <h2 className='text-center'>Admin Login </h2>
        <p>{showErr}</p>
        <form onSubmit={adminSignin} >
          <div className="l-input  ">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Here'  />
           {
            emailError && <span  className='error'>{emailError} </span>
           }
            <input type="password" className="form-control mt-4" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'  />
            {
            passwordError && <span className='error'>{passwordError} </span>
           }
            <button className='btn btn-primary w-100 mt-4'>Login</button>
          </div>
        </form>
        <p className='mt-3'>New User?<Link to="/adminsignup"><span>Create An Account</span></Link></p>
      </div>
    </div>
  )
}

export default AdminLogin