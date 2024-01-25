import React, { useEffect } from 'react'
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux'
import { filterProductCategoryAsync, getProductAsync, setSearchTerm } from '../../Redux-rtk/Slice/ProductSlice/ProductSlice'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.products.productList)

  const getData = () => {
    try {
      dispatch(getProductAsync())
    } catch (error) {
      console.log(error)
    }
  }
  const filterChangeByCategory = (e) => {
    const value = e.target.value
    if (value === "All") {
      dispatch(getProductAsync())
    } else {
      dispatch(filterProductCategoryAsync(value))
    }
  }
  const productSearch=(e)=>{
    let value =e.target.value
    if (value.length>0) {
      dispatch(setSearchTerm(value))
    }else{
      getData()
    }

  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="home">

      <div className="row">
        <div className="filter">

          <div className="row mt-3">
            <div className="col col-md-9 col-sm-7">
              <div className='ms-2 me-3'>
              <input onChange={productSearch} type="search" className='form-control search-input' placeholder='Search Product ..' />
              </div>
            </div>
            <div className="col col-md-3 col-sm-4">
             <div className=''>
             <select class=" p-1" onChange={filterChangeByCategory}
                aria-label="Default select example">
                <option selected>Filter</option>
                <option value="All">All</option>
                <option value="women">women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
                <option value="accessories">Accessories</option>
                <option value="footwere">Footwere</option>
              </select>
             </div>
            </div>
          </div>
        </div>
        {
          product.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-12 text-center">
              <div class="card mt-4" >
                <Link to={`/productdetail/${item.id}`}>
                <img src={item.productimg} class="card-img-top" alt="..." /></Link>
                <div class="card-body">
                  <h5 class="card-title">{item.productname}</h5>
                  <p class="card-text">{item.brand}</p>
                  <p class="card-text">{item.productdescription}</p>
                  <span class="card-text text-decoration-line-through">$ {item.price}</span>
                  <span class="card-text ms-3">$ {item.discountprice}</span>
                </div>
                
              </div>
            </div>
          ))
        }
      </div>
    </div>


  )
}

export default Home