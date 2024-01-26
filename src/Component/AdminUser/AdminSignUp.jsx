import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./Admin.css"
import { Link, useNavigate } from "react-router-dom"
import { createAdminAsync } from '../../Redux-rtk/Slice/AdminSlice/AdminUserSlice'
const AdminSignUp = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordError, setpasswordError] = useState()
  const [emailError, setEmailError] = useState()
  const [nameError, setNameError] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const createAdmin = (e) => {
    e.preventDefault();
    if (!name) {
      setNameError("Enter Valid Name")
    }
    if (!email) {
      setEmailError("Enter Valid Email")
    }
    if (!password) {
      setpasswordError("Enter Password")
    }

    if (email && password && name) {
      const data = { name, email, password };

      dispatch(createAdminAsync(data)).then((result) => {
      }).catch((error) => {
        console.error(error);
      });
    }

  };

  return (

    <div className='L-login'>
      <h2 className='text-center'> Admin Sign UP</h2>
      <form onSubmit={createAdmin}>
        <div className="l-input">
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name Here' />
          {
            nameError && <span className='error'>{nameError} </span>
          }
          <input type="email" className="form-control mt-4" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Here' />
          {
            emailError && <span className='error'>{emailError} </span>
          }
          <input type="password" className="form-control mt-4" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' /><br />
          {
            passwordError && <span className='error'>{passwordError} </span>
          }
          <button className='btn btn-primary mt-4 w-100'>Sign Up</button>
        </div>
      </form>
      <p className='mt-3'>Already have an account?<Link to="/adminlogin"><span>Admin Login</span></Link></p>
    </div>
  )
}

export default AdminSignUp