import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderByUserIdAsync, getOrderByUserIdAsync } from '../../Redux-rtk/Slice/CheckOut/CheckOutSlice'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyOrders = () => {

  const dispatch = useDispatch()
  const order = useSelector((state) => state.checkout.orderList)

  const cancleOrder = (id) => {
    dispatch(deleteOrderByUserIdAsync(id))
    toast.success("order has been cancle", {
      position: toast.POSITION.TOP_RIGHT,
    });
    const user = localStorage.getItem('user')
    const dataUser = JSON.parse(user)
    if (dataUser) {
      dispatch(getOrderByUserIdAsync(dataUser.id))
    }
  }
  useEffect(() => {
    const user = localStorage.getItem('user')
    const dataUser = JSON.parse(user)
    if (dataUser) {
      dispatch(getOrderByUserIdAsync(dataUser.id))
    }

  }, [dispatch])
  return (
    <div>
      <ToastContainer/>
      {
        order.length ? 
        <table class="table table-striped">

        <thead>
          <tr>
            <th>Order Id</th>
            <th>Price</th>
            <th>Status</th>
            <th>Cancle Order</th>
          </tr>
        </thead>

        <tbody>
          {
            order.length ? order.map((item) => (
              <tr>
                <td>#{item.id}</td>
                <td>${item.totalAmount}</td>
                <td>In Progress</td>
                <td><button className=' btn btn-danger cancle-btn' onClick={()=>cancleOrder(item.id)}>Cancle Order</button></td>
              </tr>
            )) : null
          }

        </tbody>

      </table>:'No Data Availabel'
      }
    </div>
  )
}

export default MyOrders