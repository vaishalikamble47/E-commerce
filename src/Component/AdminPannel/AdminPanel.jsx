import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductAsync } from '../../Redux-rtk/Slice/ProductSlice/ProductSlice'
import axios from 'axios'
import { ApiUrl } from '../../Config'

const AdminPanel = () => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.products.productList)
  const isloading = useSelector((state) => state.products.isLoading)
  const getData = () => {
    try {
      dispatch(getProductAsync())
    } catch (error) {
      console.log(error)
    }
  }
  const deleteProduct = async (id) => {
    await axios.delete(`${ApiUrl}/products/${id}`)
    dispatch(getProductAsync())
  }
  useEffect(() => {
    getData()

  }, [])
  return (
    <div className='container'>
      <h4 className='text-center mt-3 text-decoration-underline'>Product List</h4>
      <table class="table mt-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            product.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.productname}</td>
                <td>{item.price}</td>
                <td><button className='btn btn-danger' onClick={()=>deleteProduct(item.id)}>delete</button></td>
              </tr>
            ))
          }


        </tbody>
      </table>
      
            
    </div>
  )
}

export default AdminPanel