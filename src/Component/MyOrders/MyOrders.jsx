import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderByUserIdAsync, getOrderByUserIdAsync } from '../../Redux-rtk/Slice/CheckOut/CheckOutSlice'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyOrders = () => {

  const dispatch = useDispatch()
  const order = useSelector((state) => state.checkout.orderList)
  const isloading = useSelector((state) => state.checkout.isloading)
  const getOrders = () => {
    const user = localStorage.getItem('user')
    const dataUser = JSON.parse(user)
    if (dataUser) {
      dispatch(getOrderByUserIdAsync(dataUser.id))
    }
  }
  const cancleOrder = (id) => {
    dispatch(deleteOrderByUserIdAsync(id))
    getOrders()
    toast.success("order has been cancle", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  useEffect(() => {
    getOrders()

  }, [dispatch])
  return (
    <div>
      <ToastContainer />
      {
        isloading ?
          <div className="container d-flex vh-100 justify-content-center align-items-center">

            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> : null
      }
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
                    <td><button className=' btn btn-danger cancle-btn' onClick={() => cancleOrder(item.id)}>Cancle Order</button></td>
                  </tr>
                )) : null
              }

            </tbody>

          </table> : <div className="container d-flex vh-100 justify-content-center align-items-center">

            <h5 >No Orders </h5>
          </div>
      }
    </div>
  )
}

export default MyOrders