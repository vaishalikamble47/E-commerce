import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartDatabyCartIdAsync, getCartDatabyUseridAsync } from '../../Redux-rtk/Slice/CartSlice/CartSlice'
import "./Cart.css"
import { Link } from 'react-router-dom'
const Cart = () => {
  const dispatch = useDispatch()
  const cartData = useSelector((state) => state.cart.usercardlist)
  console.log(cartData);
  let sum = 0;
  const taxRate = 0.01;
  cartData.forEach(item => {
    sum = sum + (Number(item.discountprice) * item.quantity);
  });
  const taxAmount = sum * taxRate;
  const deliveryAmount = sum > 500 ? 0 : 100;

  const removeCart=(id)=>{
    const userdata = localStorage.getItem("user")
    const user = JSON.parse(userdata)
    dispatch(deleteCartDatabyCartIdAsync(id))
    dispatch(getCartDatabyUseridAsync(user.id))
  }
  useEffect(() => {
    const userdata = localStorage.getItem("user")
    const user = JSON.parse(userdata)
    if (user) {
      dispatch(getCartDatabyUseridAsync(user.id))
    }
  }, [dispatch])


  return (
    <>
   {
    cartData && cartData.length ? 
 
   <div className='container'>
   <div class="row">
     <div class="col-sm-6">
       {
         cartData.map((item) => (
           <div class="card mt-3">
             <div class="card-body">
               <div class="card-body">
                 <div className="row">
                   <div className="col-sm-6">
                     <img src={item.image} class="img" alt="..." />
                   </div>
                   <div className="col-sm-6">
                     <h5 class="card-title ">Name:- {item.productname}</h5>
                     <p class="card-text ">Price:- {item.discountprice}</p>
                     <p class="card-text ">Quantity:- {item.quantity}</p>
                     <button class="button btn btn-danger" onClick={()=>removeCart(item.id)}>Remove to Cart</button>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         ))}
     </div>
     <div class="col-sm-6">
       <div class="card mt-3">
         <div class="card-body">
           <h3>summary</h3>
           <p>Amount:- {sum}</p>
           <p>Tax :- {taxAmount}</p>
           <p>Delivery:- {deliveryAmount == 0 ? "Free" : deliveryAmount} </p>
           <h6>Total:- {sum + taxAmount + deliveryAmount}</h6>
          <Link to="/checkout"> <button className='btn btn-success checkout-btn'>Checkout</button></Link>
         </div>
       </div>
     </div>
   </div>
 </div>
   
  :'No Cart Data Availabel'
   }
   </>
  )
}

export default Cart