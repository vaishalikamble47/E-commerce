import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartDatabyCartIdAsync, getCartDatabyUseridAsync } from '../../Redux-rtk/Slice/CartSlice/CartSlice'
import { createOrderAsync } from '../../Redux-rtk/Slice/CheckOut/CheckOutSlice'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const [name, setName] = useState()
    const [mobile, setMobile] = useState()
    const [pincode, setPincode] = useState()
    const [address, setAddress] = useState()
    const [town, setTown] = useState()
    const [district, setDistrict] = useState()
    const [state, setState] = useState()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    let sum = 0;
    const taxRate = 0.01;
    const cartData = useSelector((state) => state.cart.usercardlist)
    console.log("login user selected product", cartData)
    cartData.forEach(item => {
        sum = sum + (Number(item.discountprice) * item.quantity);
    });
    const taxAmount = sum * taxRate;
    const deliveryAmount =cartData.length>0 ? (sum > 500 ? 0 : 100) : 0
    const totalAmount = sum + taxAmount + deliveryAmount

    const order = (e) => {
        e.preventDefault()
        const user = localStorage.getItem('user')
        const dataUser = JSON.parse(user)
        const data = {
             name,
            address: {
                address,
                town,
                district,
                state,
                pincode
            },
            mobile,
            userid:dataUser.id,
            totalAmount
        }
      if (name && address && town && district && state && pincode && mobile) {
        dispatch(createOrderAsync(data))
        setTimeout(() => {
            cartData.forEach(item => {
                dispatch(deleteCartDatabyCartIdAsync(item.id))
            });
          
            dispatch(getCartDatabyUseridAsync(dataUser.id))
        }, 700);
        toast.success("order has been placed", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate('/myorders')
          }, 1000);
    
      }else{
        toast.error("All Field Required", {
            position: toast.POSITION.TOP_RIGHT,
          });
      }
     }
    useEffect(() => {
        const user = localStorage.getItem('user')
        const dataUser = JSON.parse(user)
        dispatch(getCartDatabyUseridAsync(dataUser.id))

    }, [])
    return (
        <div className='container'>
             <ToastContainer />
            <div className="row">
                <h3 className='text-center mt-4'>ADD NEW ADDRESS</h3>
                <div className="col-lg-6 text-center">
                    <form>
                        <h5 className='' >Contact Detail</h5>
                        <input type="text" className='mb-3 w-75 p-1'
                            value={name} onChange={(e) => setName(e.target.value)} placeholder='Name*' /><br />
                        <input type="number" className='mb-3 w-75 p-1'
                            value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Mobile No*' />
                        <h5>Address</h5>
                        <input type="number" className='mb-3 w-75 p-1'
                            value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pin Code*' /><br />
                        <input type="text" className='mb-3 w-75 p-1'
                            value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address(House No,Building,Street,Area)*' /><br />
                        <input type="text" className='mb-3 w-75 p-1'
                            value={town} onChange={(e) => setTown(e.target.value)} placeholder='Locality/Town*' /><br />
                        <input type="text" className='mb-3 w-75 p-1'
                            value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='City/District*' /><br />
                        <input type="text" className='mb-3 w-75 p-1'
                            value={state} onChange={(e) => setState(e.target.value)} placeholder='State *' /><br />
                        <button className='btn btn-primary w-75' onClick={order}>Order Now</button>
                    </form>
                </div>
                <div className="col-lg-6 mt-5 text-center">
                    <h4 className='mt-5'>Total Amount : {totalAmount}<span></span></h4>
                    <h4>Payment Method : Cash On Delivery<span></span></h4>
                </div>
            </div>
        </div>
    )
}

export default CheckOut