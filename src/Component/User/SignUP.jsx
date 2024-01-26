import React, { useState } from 'react'
import "./Login.css"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { createUserAsync } from '../../Redux-rtk/Slice/UserSlice/UserSlice'


const SignUP = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [nameError, setNameError] = useState()
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState()

  const dispatch = useDispatch()

  const userSignup = (e) => {
    e.preventDefault();
    if (!name) {
      setNameError("Enter Valid Name")
    }
    if (!email) {
      setEmailError("Enter Valid Email")
    }
    if (!password) {
      setPasswordError("Enter Password")
    }
    if (email && password && name) {
      const data = { name, email, password };

      dispatch(createUserAsync(data)).then((result) => {
      }).catch((error) => {
        console.error(error);
      });
    }


  }

  return (
    <div className='L-login'>
      <h2 className='text-center'>Sign UP</h2>
      <form onSubmit={userSignup}>
        <div className="l-input">
          <input type="text" className="form-control " value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name Here' /><br />
          {
            nameError && <span className='color'>{nameError}</span>
          }
          <input type="email" className="form-control " value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Here' /><br />
          {
            emailError && <span className='color'>{emailError}</span>
          }

          <input type="password" className="form-control " value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' /><br />
          {
            passwordError && <span className='color'>{passwordError}</span>
          }
          <button className='btn btn-primary w-100'>Sign Up</button>
        </div>
      </form>
      <p className='mt-3'>Already have an account?<Link to="/login"><span>Log In</span></Link></p>
    </div>
  )
}

export default SignUP