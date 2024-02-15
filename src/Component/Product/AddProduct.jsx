import React, { useState } from 'react'
import "./Product.css"
import { useDispatch } from 'react-redux'
import { addProductAsync } from '../../Redux-rtk/Slice/ProductSlice/ProductSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddProduct = () => {

  const [productname, setProductname] = useState()
  const [productdescription, setProductdescription] = useState()
  const [productbrief, setProductbrief] = useState()
  const [price, setPrice] = useState()
  const [discountprice, setDiscountprice] = useState()
  const [productimg, setProductimg] = useState()
  const [category, setCategory] = useState()
const[brand,setBrand]=useState()
  
  
  const [showerr, setShowerr] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [apierr, setApierr] = useState()

  const createproduct = async (e) => {
    e.preventDefault()
    const data = { productname, productdescription,  price, discountprice, productimg,category,brand}
    if (productname && productdescription && price && discountprice && productimg&& category&&brand) {
      try {
        const result = await dispatch(addProductAsync(data))
        toast.success("Product Added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/")
        }, 1000);
      
      } catch (error) {
        setApierr("something went wrong")
        setTimeout(() => {
          setApierr("")
        }, 2000)
      }
      setShowerr("")
    } else {
      setShowerr("All Field Are required")
    }
  }

  return (
    <div className='container p-container'>
  <ToastContainer />
      <form onSubmit={createproduct}>   
        <div className="row p-row mt-4 text-center">
          <h2 >Add New Product</h2>
          <div className="col-6 m-auto text-start">
            <p style={{ color: "red" }}>{showerr}</p>
            <p style={{ color: "red" }}>{apierr}</p>
            <div className='mb-3'>
              <label >Product Name</label><br />
              <input type="text" className='w-100 p-1'
                value={productname}
                onChange={(e) => setProductname(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label>Brand</label><br />
              <input type="text" className='w-100 p-1'
                value={brand}
                onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label>Short Description</label><br />
              <input type="text" className='w-100 p-1'
                value={productdescription}
                onChange={(e) => setProductdescription(e.target.value)} />
            </div>
            {/* <div className='mb-3'>
              <label>Product Brief</label><br />
              <textarea type="text" className='w-100'
                value={productbrief}
                onChange={(e) => setProductbrief(e.target.value)} />
            </div> */}
            <div className='mt-3 row'>
              <div className='col-md-6 col-sm-12'>
                <label>Price</label>

                <input type="number" className='w-100 p-1'
                  value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>

              <div className='col-md-6 col-sm-12' >
                <label>Discount Price</label>

                <input type="number" className='w-100 p-1'
                  value={discountprice} onChange={(e) => setDiscountprice(e.target.value)} />
              </div>
            </div>
            <div className='mt-3'>


              <select class="form-select"
               aria-label="Default select example" onChange={(e)=>setCategory(e.target.value)}>
                <option selected>Category</option>
                <option value="women">women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
                <option value="accessories">Accessories</option>
                <option value="footwere">Footwere</option>
              </select>



            </div>

            <div className='mt-3' >
              <label>Product Image</label><br />
              <input type="text" className='w-100 p-1'
                value={productimg} onChange={(e) => setProductimg(e.target.value)} />
            </div>

            <div className="p-button">
              <button className='btn btn-primary w-100  mt-3 '>Add Product</button>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct