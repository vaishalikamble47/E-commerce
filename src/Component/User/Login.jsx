import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { useDispatch } from 'react-redux'
import { loginUserAsync } from '../../Redux-rtk/Slice/UserSlice/UserSlice'

const Login = ({checkuserlog}) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState()
  const [showErr, setShowErr] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userSignin = async (e) => {
    debugger
    if (!email) {
      setEmailError("Enter Valid Email")
    }
    if (!password) {
      setPasswordError("Enter Password")
    }

    const data = { email, password }
    e.preventDefault()
    if (email && password) {
      try {
        const result = await dispatch(loginUserAsync(data))
        let userdata = result.payload.data[0]
        delete userdata.password
        localStorage.setItem("user", JSON.stringify(userdata))
        checkuserlog()
        navigate("/")
      } catch (error) {
        console.log(error)
        setShowErr("Invalid Credential")
      }
    }

  }
  return (
    <div className='L-login'>
      <h2 className='text-center'>Login Here</h2>
      <p className='color'>{showErr}</p>
      <form onSubmit={userSignin}>
        <div className="l-input">
          <input type="email" className="form-control "
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Your Email Here' /><br />
          {
            emailError && <span className='color'>{emailError} </span>
          }

          <input type="password" className="form-control "
            value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder='Password' /><br />
          {
            passwordError && <span className='color'>{passwordError} </span>
          }
          <button className='btn btn-primary'>Login</button>
        </div>
      </form>
      <p className='mt-3'>New Customer?<Link to="/signup"><span>Create An Account</span></Link></p>
    </div>
  )
}

export default Login